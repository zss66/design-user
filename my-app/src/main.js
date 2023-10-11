import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'amfe-flexible';
import '../src/assets/base.css'
import 'vant/lib/index.css';
createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
