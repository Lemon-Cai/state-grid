/*
 * @Author: CP
 * @Date: 2024-01-12 14:40:08
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  dts from 'vite-plugin-dts'

import { resolve } from 'path'

const projRoot = resolve(__dirname, '..', '..')

const componentRoot = resolve(projRoot, 'packages', 'components')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    outDir: [resolve(componentRoot, 'es'), resolve(componentRoot, 'lib')]
  })],
  build: {
    target: 'modules',
    //打包文件目录
    outDir: resolve(componentRoot, 'es'),
    //压缩
    minify: true,
    lib: {
      entry: './index.ts',
      // name: 'ui',
      formats: ['es', 'cjs'],
      fileName: (format) => `[name].${format}.js`
    },
    cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue、element-plus 确保外部化处理那些你不想打包进库的依赖，防止多个vue产生冲突
      external: ['vue', 'element-plus'],
      input: ['./index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          // entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: componentRoot,
          exports: 'named',

          // exports: undefined,
          // 配置打包根目录
          dir: resolve(componentRoot, 'es'),
        },
        {
          // CommonJs
          format: 'cjs',
          // entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: componentRoot,
          exports: 'named',
          //配置打包根目录
          dir: resolve(componentRoot, 'lib'),
        },
      ],
    },
  },
})
