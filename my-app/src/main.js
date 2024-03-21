import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import http from './utils/request'
import { cart } from './pinia/cartinfo'
import { userInfo } from './pinia/userinfo'
import { path } from './pinia/path'
import persistedState from 'pinia-plugin-persistedstate'
import router from './router'
import { showToast } from 'vant'
import 'amfe-flexible';
import '../src/assets/base.css'
import 'vant/lib/index.css';
import { order } from './pinia/order'
createApp(App)
    .use(createPinia().use(persistedState))
    .use(router)
    .mount('#app')
router.beforeEach((to) => {
    // ✅这会正常工作，因为它确保了正确的 store 被用于
    // 当前正在运行的应用
    if (to.name === 'cart') {
        if (userInfo().loginstatus) {
            http.post('api/selectCart').then(res => {
                console.log(res);
                if (res.data.data.success) {
                    cart().data = res.data.data;
                    cart().statuschange();
                }
            })
        }
        else {
            showToast('当前为未登录状态，请前往登录')
            router.push('/login')
        }
    }
    if (to.name === 'path' || to.name === 'order') {
        path().getpath();
    }
    if (to.name === 'myorder') {
        order().getdata();
    }


})
