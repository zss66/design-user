import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import searchListVue from '../components/others/searchList.vue'
const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.name == 'home') {
            const scrollhome = sessionStorage.getItem('scrollhome')
            return { top: JSON.parse(scrollhome) }
        }
    },
    routes: [
        {
            name: 'home',
            path: '/',
            component: home,
            meta: {
                title: '首页',
                keepAlive: true,
            },

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
            component: () => import('../components/login/index.vue')
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
        },
        {
            name: 'path',
            path: '/path',
            component: () => import('../components/path/show.vue'),
            children: [
                {
                    name: 'newpath',
                    path: 'newpath',
                    component: () => import('../components/path/editor.vue'),
                }
            ]
        },
        {
            name: 'order',
            path: '/order',
            component: () => import('../components/order/index.vue')
        },
        {
            name: 'myorder',
            path: '/myorder',
            component: () => import('../components/myorder/index.vue')
        },
        {
            name: 'myinfo',
            path: '/myinfo',
            component: () => import('../components/myinfo.vue')
        },
        {
            name: 'sideswiper',
            path: '/sideswiper',
            component: () => import('../components/sideswiper/index.vue')
        },

    ]
})
export default router