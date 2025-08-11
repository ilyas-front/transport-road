import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    base: '/transport-road/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    }
});
