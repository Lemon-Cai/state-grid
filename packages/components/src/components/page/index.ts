/*
 * @Author: CP
 * @Date: 2024-01-15 16:22:21
 * @Description: 
 */
import type { App } from 'vue'

import { withNoopInstall } from '../../util'

import Page from './src/page.vue'
import Content from './src/content.vue'
import Header from './src/header.vue'
import Footer from './src/footer.vue'
import Aside from './src/aside.vue'


export default Object.assign(Page, {
  install: function (app: App) {
    app.component(Page.name, Page);    
    app.component(Content.name, Content);    
    app.component(Header.name, Header);    
    app.component(Footer.name, Footer);    
    app.component(Aside.name, Aside);    
  }
})

export const ZHeader = withNoopInstall(Header)
export const ZContent = withNoopInstall(Content)
export const ZFooter = withNoopInstall(Footer)
export const ZAside = withNoopInstall(Aside)