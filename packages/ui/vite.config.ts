/*
 * @Author: CP
 * @Date: 2024-01-11 11:30:13
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'modules',
    //打包文件目录
    // outDir: 'es',
    //压缩
    minify: true,
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      // name: 'zui',
      formats: ['es', 'cjs'],
      fileName: (format) => `[name].${format}.js`
    },
    rollupOptions: {
      //忽略打包vue、element-plus
      external: ['vue'],
      input: ['./index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          // entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          // preserveModules: true,
          // preserveModulesRoot: resolve(projRoot, 'packages', 'ui'),
          // exports: 'named',

          // exports: undefined,
          // 配置打包根目录
          dir: resolve(__dirname, 'es'),
        },
        {
          // CommonJs
          format: 'cjs',
          // entryFileNames: '[name].js',
          // //让打包目录和我们目录对应
          // preserveModules: true,
          // exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, 'lib'),
        },
      ],
    },
  }
})
