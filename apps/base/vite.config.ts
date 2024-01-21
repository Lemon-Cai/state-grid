/*
 * @Author: CP
 * @Date: 2024-01-12 14:58:48
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { projRoot } from '@apps/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueJsx(),
  ],
  base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: path.resolve(
      projRoot,
      'dist',
      'base'
    )
  },
  server: {
    port: 8081,
    open: true
  },
}))
