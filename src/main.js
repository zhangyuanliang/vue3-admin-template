import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

//pinia
import { createPinia } from 'pinia'

createApp(App)
  .use(router)
  .use(createPinia())
  .component('SvgIcon', svgIcon)
  .mount('#app')
