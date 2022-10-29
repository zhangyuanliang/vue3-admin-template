import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)

//pinia
import { createPinia } from 'pinia'

app.use(createPinia())

createApp(App).mount('#app')
