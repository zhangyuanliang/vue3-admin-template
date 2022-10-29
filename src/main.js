import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

//pinia
import { createPinia } from 'pinia'

createApp(App)
  .use(router)
  .use(createPinia())
  // .use(ElementPlus)
  .component('SvgIcon', svgIcon)
  .mount('#app')
