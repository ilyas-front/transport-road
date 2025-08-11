import { promises as fs } from 'fs';
import path from 'path';

// Simple FSD layer policy checker for path aliases `@/`.
// Layers order (low -> high): shared -> entities -> features -> widgets -> pages -> app
// Rule: higher layers may import from lower or same; lower must not import from higher.

const LAYERS = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];

const projectRoot = path.resolve(process.cwd());
const SRC_DIR = path.join(projectRoot, 'src');

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

function detectLayerByAbsolutePath(filePath) {
  const rel = path.relative(SRC_DIR, filePath).replace(/\\/g, '/');
  const top = rel.split('/')[0];
  return LAYERS.includes(top) ? top : null;
}

function parseImports(source) {
  const imports = [];
  const importRegex = /import\s+(?:[^'";]+?\s+from\s+)?["']([^"']+)["']/g;
  let m;
  while ((m = importRegex.exec(source))) {
    imports.push(m[1]);
  }
  return imports;
}

function targetLayerFromAlias(importPath) {
  if (!importPath.startsWith('@/')) return null;
  const afterAlias = importPath.slice(2);
  const top = afterAlias.split('/')[0];
  return LAYERS.includes(top) ? top : null;
}

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async e => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return listFiles(full);
      return [full];
    })
  );
  return files.flat();
}

function isCodeFile(filePath) {
  return EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function violatesFsdPolicy(fromLayer, toLayer) {
  if (!fromLayer || !toLayer) return false; // ignore unknown
  const fromIndex = LAYERS.indexOf(fromLayer);
  const toIndex = LAYERS.indexOf(toLayer);
  // Allow same or lower-to-higher? Policy: only import from same or lower index (towards shared)
  // Lower index is more foundational.
  // Violation when importing from higher index (upwards).
  return toIndex > fromIndex;
}

async function run() {
  const files = (await listFiles(SRC_DIR)).filter(isCodeFile);
  const violations = [];

  for (const file of files) {
    const layer = detectLayerByAbsolutePath(file);
    if (!layer) continue;
    const code = await fs.readFile(file, 'utf8');
    const imports = parseImports(code);
    for (const imp of imports) {
      const toLayer = targetLayerFromAlias(imp);
      if (!toLayer) continue;
      if (violatesFsdPolicy(layer, toLayer)) {
        violations.push({ file, layer, importPath: imp, toLayer });
      }
    }
  }

  if (violations.length === 0) {
    console.log('[check-fsd] No violations found.');
    return;
  }

  console.log(`[check-fsd] Found ${violations.length} violation(s):`);
  for (const v of violations) {
    const rel = path.relative(projectRoot, v.file).replace(/\\/g, '/');
    console.log(` - ${rel} (${v.layer}) imports ${v.importPath} (${v.toLayer})`);
  }
  process.exitCode = 2;
}

run().catch(err => {
  console.error('[check-fsd] Fatal error:', err);
  process.exit(1);
});


