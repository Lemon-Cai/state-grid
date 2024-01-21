/*
 * @Author: CP
 * @Date: 2024-01-15 14:40:20
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'

import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    port: 8094,
    // open: true
    cors: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: path.join(
      __dirname,
      '../../dist/business-child'
    )
  },
  base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
}))
