/*
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-04-19 13:31:24
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-26 16:13:15
 * @FilePath: /desktop-tutorial/my-app/src/pinia/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import router from '../router'
import http from '../utils/request'
import { shop } from './shop'
export const usedata = defineStore('data', {
    persist: true,
    state: () => ({
        searchlist: {},
        //shoper data
        data: [],
        pj:[],
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
        shopselect: [],
        shopoffer: [],
        //创建list-tab的active
        list_act: 0,
        //响应状态---用于过渡动画
        request_state: 0,
    })
    ,
    getters: {

    },
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
        shopoffers() {
            this.shopoffer = this.shopselect.offer.split(',')
        },
        getshopId(item) {
            if (item) {
                this.shopselect = item

                http.get('api/getclass', {
                    params: {
                        shopid: item.id
                    }
                }).then(res => {
                    this.data = res.data.data.sort((a, b) => {
                        return parseInt(a.classid) - parseInt(b.classid)
                    })
                    http.get('api/order/pj',{
                        params:{
                            shoperid:item.id
                        }
                    }).then(res=>{
                       this.pj= res.data.data.list
                       shop().refreshdata()
                    router.push('/detail')
                    })
                    
                })
            }
        },
        //查询商品接口
        dbconnect(result) {
            http.get('api/goods/shoplist', {
                params: {
                    name: result
                }
            }).then(res => {
                this.search = res.data.data;
                console.log(res);
            })
        },

    },
    //获取商家提供的服务

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