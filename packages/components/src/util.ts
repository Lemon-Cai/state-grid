/*
 * @Author: CP
 * @Date: 2024-01-12 15:53:00
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import type { App } from "vue";

import type { WithInstallFunction, SFCWithInstall } from './type'

// import { NOOP } from './type'


export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  const c = main as WithInstallFunction<T>;
  
  c.install = function (app: App) {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.displayName || comp.name, comp)
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }

  return main;
};


export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = () => {}

  return component as SFCWithInstall<T>
}
