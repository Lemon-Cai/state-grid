/*
 * @Author: CP
 * @Date: 2024-01-10 16:40:07
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import { uiRoot } from '@apps/utils'


// 项目根目录
export const projRoot = resolve(__dirname, '..', '..')

export const pkgRoot = resolve(projRoot, 'packages')

export const uiRoot = resolve(pkgRoot, 'ui')
export const cmpRoot = resolve(pkgRoot, 'components')
export const utilsRoot = resolve(pkgRoot, 'utils')


export const outputPath = resolve(uiRoot, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //压缩
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      // name: 'zui',
      formats: ['es', 'cjs'],
      fileName: (format) => `[name].${format}.js`
    },
    //css分离
    cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue、element-plus
      external: ['vue', 'element-plus'],
      input: ['./src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: resolve(projRoot, 'packages', 'ui'),
          // exports: 'named',

          exports: undefined,
          // 配置打包根目录
          dir: resolve(uiRoot, 'es'),
        },
        {
          // CommonJs
          format: 'cjs',
          entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: resolve(uiRoot, 'lib'),
        },
      ],
    },
  }
})
