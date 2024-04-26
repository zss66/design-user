/*
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-03-21 15:10:24
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-24 08:59:07
 * @FilePath: /desktop-tutorial/my-app/src/pinia/cartinfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        selecid: []

    }),
    getters: {

    },

    actions: {
        statuschange() {
            this.totalprice = 0;
            this.all = true
            this.selecid = []
            this.selectdata = []
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
        checkShop() {
            console.log(this.selectdata);
            this.selectdata.forEach(i => {
                const selectedData = this.data.data.filter(item => item.id == i);
                console.log(selectedData
                );
                this.selecid.push(selectedData[0].shopid)
            })
            function allElementsAreSame(array) {
                // 如果数组为空，则返回 true
                if (array.length === 0) {
                    return true;
                }

                // 将数组中的第一个元素作为比较对象
                const firstElement = array[0];

                // 使用 every 方法检查数组中的每个元素是否与第一个元素相同
                return array.every(element => element === firstElement);
            }
            return allElementsAreSame(this.selecid)
        },
        groupedCartData() {
            const cartData = this.data.data; // 假设您有一个函数 cart() 返回购物车数据
            const groupedData = {};
            cartData.forEach(item => {
                // 如果店铺ID不存在，则创建一个新数组
                if (!groupedData[item.shopid]) {
                    groupedData[item.shopid] = [];
                }
                // 将商品添加到相应的店铺数组中
                groupedData[item.shopid].push(item);
            });
            return groupedData;
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
