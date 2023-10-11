import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import searchListVue from '../components/others/searchList.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: home,
            meta: {
                title: '首页',
                keepAlive: true,
            }
        },
        {
            name: 'detail',
            path: '/detail',
            title: '详情页',
            component: () => import('../components/detail/index.vue')

        },
        {
            name: 'search',
            path: '/search',
            children: [{
                name: 'slist',
                path: 'list',
                component: searchListVue
            }],

            component: () => import('../components/home/search.vue')
        }
        , {
            name: 'list',
            path: '/list',
            component: () => import('../views/list.vue')
        },
        {
            name: 'cart',
            path: '/cart',
            component: () => import('../views/cart.vue')
        },
        {
            name: 'mine',
            path: '/mine',
            component: () => import('../views/mine.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../components/login/index.vue'),

        },
        {
            name: 'zhuce',
            path: '/zhuce',
            component: () => import('../components/login/newuser.vue')
        },
        {
            name: 'find',
            path: '/find',
            component: () => import('../components/findpass/findpsw.vue'),
            children: [{
                name: 'newpsd',
                path: 'newpsd',
                component: () => import('../components/findpass/newpsd.vue'),
            }]
        }
    ]
})
export default router