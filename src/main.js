import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/router/permission'
import { loadSvg } from '@/icons'

import './styles/tailwind.css'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import './styles/index.scss'

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(loadSvg)
  .mount('#app')
