import { defineConfig } from 'vite'

export default defineConfig({
   root: './',
   base: './',
   publicDir: 'static',
   build: { outDir: 'dist', emptyOutDir: true, sourcemap: true },
   server: { host: true, open: true },
})
