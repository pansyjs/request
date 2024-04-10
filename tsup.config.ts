import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  globalName: 'request',
  format: ['cjs', 'esm', 'iife'],
  clean: true,
  legacyOutput: true,
  dts: true,
})
