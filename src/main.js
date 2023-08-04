import 'bootstrap/dist/css/bootstrap.css'
// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle"
window.bootstrap = bootstrapBundle


import '@/assets/static/js/components/dark.js'
// import featherIcons from "feather-icons"
// featherIcons.replace()

const pinia = createPinia()
const app = createApp(App)


app.use(router)
app.use(pinia)

app.mount('#app')
