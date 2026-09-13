import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:3060',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 3060',
    url: 'http://127.0.0.1:3060',
    reuseExistingServer: false,
  },
})
