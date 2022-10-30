import { createApp } from 'vue'
import App from './App.vue'
import router from '@//router'
import store from '@/store'
import './styles/index.scss'
import './styles/tailwind.css'
import "@/router/permission"

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

//pinia
import { createPinia } from 'pinia'

createApp(App)
  .use(router)
  .use(store)
  // .use(ElementPlus)
  .component('SvgIcon', svgIcon)
  .mount('#app')
