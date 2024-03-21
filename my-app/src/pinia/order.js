import { defineStore } from "pinia";
import http from '../utils/request'
import { showToast } from 'vant'
export const order = defineStore('order', {
    state: () => ({
        ordertab: ['全部', '待付款', '待收货', '已完成'],
        orderlist: []
    })
    ,
    getters: {

    },
    actions: {
        getdata() {
            http.get('api/orderdata').then(res => {
                console.log(res.data);
                this.orderlist = [res.data
                    , res.data.filter(item => item.order_status == 2)
                    , res.data.filter(item => item.order_status == 3)
                    , res.data.filter(item => item.order_status == 4)]
            })
        }
    }
})