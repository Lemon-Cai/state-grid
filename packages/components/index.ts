/*
 * @Author: CP
 * @Date: 2024-01-11 13:08:00
 * @Description: 
 */
// import components from './src/index';

// export * from './src/index';

// export default {
//   install: app => components.forEach(c => app.use(c)),
// };


import type { App } from 'vue'

import 'element-plus/dist/index.css'

import * as components from './src'

// import './src/styles.ts'

export * from './src'

export const install = (app: App) => {
  Object.keys(components).forEach((key) => {
    const componentPlugin = components[key as keyof typeof components];
    if (componentPlugin.install) {
      app.use(componentPlugin)
    }
  })

  // 全局属性
  // app.config.globalProperties.$message = components.message;
}


export default {
  install,
};
