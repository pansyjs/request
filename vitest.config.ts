import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {},
  },
  test: {
    environment: 'jsdom',
    setupFiles: [
      resolve(__dirname, 'test/setup.ts')
    ],
    reporters: 'dot',
  }
})
