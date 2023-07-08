import { defineStore } from 'pinia'

import http from '../utils/request'
export const usedata = defineStore('data', {
    state: () => ({
        searchlist: {},
        renew: true,
        bol: false,
        active_footer: 0,
        active: 0,
        img: '',
        topBar: '',
        swiper: '',
        icon: '',
        like: '',
        showitem: '',
        search: [],
        //创建list-tab的active
        list_act: 0,
        //响应状态---用于过渡动画
        request_state: 0,
    })
    ,
    getters: {

    }
    ,
    actions: {
        async getdata() {
            http.get('api/data').then(res => {
                this.topBar = res.data.data.topBar;
                this.swiper = res.data.data.swiper;
                this.icon = res.data.data.icon;
                this.showitem = res.data.data.recomnd;
                // this.like = res.data.data.like;
            })

        },
        dbconnect(result) {
            http.get('api/goods/shoplist', {
                params: {
                    id: 1,
                    name: result
                }
            }).then(res => {
                this.like = res.data.data;
            })
        }
    },
    // async fetchData() {
    //     // 使用HTTP请求或其他方式从后端获取数据
    //     const response = await fetch('/api/backend-data');
    //     const data = await response.json();

    //     // 将数据保存到store的backendData属性中
    //     this.backendData = data;
    // },


})