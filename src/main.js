import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/router/permission'
import { loadSvg } from '@/icons'

import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import './styles/index.scss'
import './styles/tailwind.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(store)
  .use(loadSvg)
  // .use(ElementPlus)
  .mount('#app')
