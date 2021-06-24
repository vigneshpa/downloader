import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

(<any>window).app = createApp(App).mount('#app')
