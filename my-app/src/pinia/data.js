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
        // like: '',
        likes: '',
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
        getdata() {
            http.get('api/data').then(res => {
                this.topBar = res.data.data.topBar;
                this.swiper = res.data.data.swiper;
                this.icon = res.data.data.icon;
                this.showitem = res.data.data.recomnd;
                this.likes = res.data.data.like;
                // this.like = res.data.data.like;
            })
        },
        //查询商品接口
        dbconnect(result) {
            http.get('api/goods/shoplist', {
                params: {
                    id: 1,
                    name: result
                }
            }).then(res => {
                this.search = res.data.data;
                console.log(res);
            })
        },

    },
    //获取分类数据接口
    items() {
        http.get('item').then(res => {
            console.log(res);
        })
    }
    // async fetchData() {
    //     // 使用HTTP请求或其他方式从后端获取数据
    //     const response = await fetch('/api/backend-data');
    //     const data = await response.json();

    //     // 将数据保存到store的backendData属性中
    //     this.backendData = data;
    // },


})