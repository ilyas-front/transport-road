import { promises as fs } from 'fs';
import path from 'path';

// Lazy-load TypeScript to avoid ESM/CJS interop issues
const ts = await import('typescript');

const projectRoot = path.resolve(process.cwd());

const SRC_DIR = path.join(projectRoot, 'src');
const EXTRA_FILES = [
  path.join(projectRoot, 'vite.config.ts'),
  path.join(projectRoot, 'tailwind.config.js'),
  path.join(projectRoot, 'postcss.config.js'),
];

const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const CSS_EXTENSIONS = new Set(['.css']);

function getScriptKindByExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.ts':
      return ts.ScriptKind.TS;
    case '.tsx':
      return ts.ScriptKind.TSX;
    case '.js':
      return ts.ScriptKind.JS;
    case '.jsx':
      return ts.ScriptKind.JSX;
    default:
      return ts.ScriptKind.Unknown;
  }
}

async function listAllFilesRecursive(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return listAllFilesRecursive(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

function removeCssBlockComments(content) {
  // Remove /* ... */ comments conservatively
  return content.replace(/\/\*[\s\S]*?\*\//g, '');
}

async function processCodeFile(filePath) {
  const original = await fs.readFile(filePath, 'utf8');
  const scriptKind = getScriptKindByExtension(filePath);
  const sourceFile = ts.createSourceFile(
    filePath,
    original,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    scriptKind
  );
  const printer = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed });
  const printed = printer.printFile(sourceFile);
  if (printed !== original) {
    await fs.writeFile(filePath, printed, 'utf8');
    return { filePath, changed: true };
  }
  return { filePath, changed: false };
}

async function processCssFile(filePath) {
  const original = await fs.readFile(filePath, 'utf8');
  const cleaned = removeCssBlockComments(original);
  if (cleaned !== original) {
    await fs.writeFile(filePath, cleaned, 'utf8');
    return { filePath, changed: true };
  }
  return { filePath, changed: false };
}

async function run() {
  const srcFiles = (await listAllFilesRecursive(SRC_DIR)).filter(fp => {
    const ext = path.extname(fp).toLowerCase();
    return CODE_EXTENSIONS.has(ext) || CSS_EXTENSIONS.has(ext);
  });

  const extraExisting = [];
  for (const extra of EXTRA_FILES) {
    try {
      await fs.access(extra);
      const ext = path.extname(extra).toLowerCase();
      if (CODE_EXTENSIONS.has(ext)) extraExisting.push(extra);
    } catch (_) {
      // ignore missing
    }
  }

  const targets = [...srcFiles, ...extraExisting];
  let changedCount = 0;

  for (const file of targets) {
    const ext = path.extname(file).toLowerCase();
    try {
      if (CODE_EXTENSIONS.has(ext)) {
        const res = await processCodeFile(file);
        if (res.changed) changedCount += 1;
      } else if (CSS_EXTENSIONS.has(ext)) {
        const res = await processCssFile(file);
        if (res.changed) changedCount += 1;
      }
    } catch (err) {
      console.error(`[strip-comments] Failed for ${file}:`, err?.message || err);
      // continue
    }
  }

  console.log(`[strip-comments] Processed ${targets.length} files, modified ${changedCount}.`);
}

run().catch(err => {
  console.error('[strip-comments] Fatal error:', err);
  process.exit(1);
});


