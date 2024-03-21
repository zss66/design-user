import { defineStore } from "pinia";
import http from '../utils/request'
import { showToast } from 'vant'
export const cart = defineStore('cart', {
    persist: true,
    state: () => ({
        data: [],
        selectdata: [],
        totalprice: 0,
        all: true,
    }),
    getters: {

    },

    actions: {
        statuschange() {
            this.totalprice = 0;
            this.all = true
            this.data.data.forEach(element => {
                if (element.checked) {
                    if (!this.selectdata.includes(element.id)) {
                        this.selectdata.push(element.id);
                    }
                    this.totalprice += element.goods_num * element.goods_price
                }
                else {
                    this.all = false
                    const index = this.selectdata.indexOf(element.id); // 查找要删除的元素的索引
                    if (index !== -1) {
                        this.selectdata.splice(index, 1); // 使用splice()方法删除该元素
                    }
                }
            });
        },
        delcart() {
            if (this.selectdata.length !== 0) {
                http.post('api/deleteCart', {
                    arrId: this.selectdata
                })
                http.post('api/selectCart').then(res => {
                    if (res.data.data.success) {
                        cart().data = res.data.data;
                        cart().statuschange();
                    }
                })

            }
            else {
                showToast('当前选择为空')
            }
            this.selectdata = [];
        },
        updatanum(id, num) {
            http.post('api/updateNum', {
                id,
                num
            })
            this.statuschange()
        },
        checkeds(id, checked) {
            http.post('api/checked', {
                id,
                checked
            })
            this.statuschange()
        }
    }
})
