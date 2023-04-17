import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import './style.css'
import App from './App.vue'
// 引入路由
import {router} from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

import './permission'
import "nprogress/nprogress.css"

import 'virtual:windi.css'
app.mount('#app')
