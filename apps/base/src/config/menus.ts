// import type { AsyncComponentLoader } from 'vue'

// export interface Menu {
//   name: string
//   path?: string
//   component?: string | AsyncComponentLoader
//   key: number
//   children?: Menu[],
// }

// path: string;
//     name: string;
//     component?: string | (() => Promise<unknown>);
//     redirect?: string;
//     meta: MetaProps;
//     children?: MenuOptions[];

export const menuList: Menu.MenuOptions[] = [
  {
    key: 1,
    name: 'Vue3主应用',
    path: 'main',
    component: 'Layout',
    meta: {
      icon: 'Menu',
      title: '使用 ProTable'
    },
    children: [
      {
        key: 10,
        name: 'welcome',
        component: '/home/welcome', // 对应 views 下的页面
        path: 'welcome',
        meta: {
          icon: 'Menu',
          title: '欢迎页',
          isFull: false, // 是否全屏展示
        },
      },
      {
        key: 11,
        path: 'communication-test',
        name: '主应用通信测试',
        component: 'CommunicationTest',
        meta: {
          icon: 'Menu',
          title: '主应用通信测试'
        },
      },
      {
        key: 12,
        path: 'navigate-view',
        name: '主应用跳转测试',
        component: 'NavigateView',
        meta: {
          icon: 'Menu',
          title: '主应用跳转测试'
        },
      }
    ]
  },
  {
    key: 2,
    name: 'Vue3业务子应用',
    path: 'businessApp',
    component: 'Layout',
    meta: {
      icon: 'Menu',
      title: 'Vue3业务子应用'
    },
    children: [
      {
        key: 21,
        path: 'communication-test',
        name: 'Vue2通信测试',
        meta: {
          icon: 'Menu',
          title: 'Vue2通信测试'
        },
      },
      {
        key: 22,
        path: 'navigate-view',
        name: '子应用跳转测试',
        meta: {
          icon: 'Menu',
          title: '子应用跳转测试'
        },
      }
    ]
  }
  // {
  //   key: 3,
  //   name: 'React18子应用',
  //   path: 'reactApp',
  //   component: 'Layout.vue',
  //   children: [
  //     {
  //       key: 31,
  //       path: 'communication-test',
  //       name: 'React18通信测试'
  //     },
  //     {
  //       key: 32,
  //       path: 'navigate-view',
  //       name: '子应用跳转测试'
  //     },
  //     {
  //       key: 33,
  //       path: 'microapp-view',
  //       name: 'React18作为主应用'
  //     }
  //   ]
  // },
  // {
  //   key: 4,
  //   name: 'Vite子应用',
  //   path: 'viteApp',
  //   component: 'Layout.vue',
  //   children: [
  //     {
  //       key: 41,
  //       path: 'communication-test',
  //       name: 'Vite通信测试'
  //     },
  //     {
  //       key: 42,
  //       path: 'navigate-view',
  //       name: '子应用跳转测试'
  //     }
  //   ]
  // },
  // {
  //   key: 5,
  //   name: '子应用共存测试',
  //   path: 'coexist-micro-app',
  //   component: 'CoexistMicroApp.vue'
  // },
  // {
  //   key: 6,
  //   name: 'CSS隔离测试',
  //   path: 'css-isolation',
  //   component: 'CssIsolation.vue'
  // },
  // {
  //   key: 7,
  //   name: '子应用保活',
  //   path: 'keep-alive-app',
  //   component: 'Layout.vue',
  //   children: [
  //     {
  //       key: 71,
  //       name: 'Vue2子应用保活',
  //       path: 'vue2',
  //       component: 'Vue2KeepAliveView.vue'
  //     },
  //     {
  //       key: 72,
  //       name: 'React18子应用保活',
  //       path: 'react18',
  //       component: 'React18KeepAliveView.vue'
  //     },
  //     {
  //       key: 73,
  //       name: 'Vite子应用保活',
  //       path: 'vite',
  //       component: 'ViteKeepAliveView.vue'
  //     }
  //   ]
  // }
]
