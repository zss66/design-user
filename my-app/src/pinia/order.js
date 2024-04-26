/*
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-03-21 15:10:24
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-24 08:46:13
 * @FilePath: /desktop-tutorial/my-app/src/pinia/order.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
                this.orderlist = [res.data
                    , res.data.filter(item => item.order_status == 2)
                    , res.data.filter(item => item.order_status >= 3 && item.order_status < 6)
                    , res.data.filter(item => item.order_status >= 6)]
                console.log(this.orderlist);
            })
        }
    }
})