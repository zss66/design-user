/*
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-04-01 11:04:31
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-26 16:10:45
 * @FilePath: /desktop-tutorial/my-app/src/pinia/shop.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import router from "../router";
import http from "../utils/request";
export const shop = defineStore('shop', {
    persist: true,
    state: () => ({
        data: [],
        taocan: [],
        shopselect: [],
        taocanprice: 0,
        choice: [],
        cart: []

    }),
    getters: {
        choicePrice() {
            // 使用 reduce 方法计算总价
            return this.choice.reduce((total, item) => {
                // 确保商品的数量和单价都存在且为有效数字
                if (typeof item.num === 'number' && typeof item.price === 'number' && item.num >= 0 && item.price >= 0) {
                    // 将当前商品的数量乘以单价，然后加到总价中
                    total += item.num * item.newprice;
                }
                else {
                    total = 0
                }
                // 返回累加后的总价
                return total;
            }, 0);
        },
        price0(state) {
            if (state.taocan.length == 0) {
                state.taocanprice = 0
            }
        }

    },

    actions: {
        refreshdata() {
            this.taocan = [],
                this.taocanprice = 0,
                this.choice = []
        },
        getcart() {
            this.cart = this.choice.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.newprice,
                    num: item.num,
                    img: item.img,
                    dec: '单品购买',
                    // 这里可以根据需要选择保留的字段
                };
            });
            if (this.taocanprice == 7) {
                this.cart.push({
                    id: -1,
                    name: this.taocan.map(item => `${item.name} * ${item.num}`).join(' + '),
                    price: 7,
                    num: 1,
                    img: 'https://zss666.top/images/一荤一素.jpg',
                    dec: '商品id: ' + this.taocan.map(item => `${item.id} `).join(' 、')
                })
            }
            else if (this.taocanprice == 8) {
                this.cart.push({
                    id: -2,
                    name: this.taocan.map(item => `${item.name} * ${item.num}`).join(' + '),
                    price: 8,
                    num: 1,
                    img: 'https://zss666.top/images/一荤两素.jpg',
                    dec: '商品id: ' + this.taocan.map(item => `${item.id} `).join(' 、')
                })
            }
            else if (this.taocanprice == 9) {
                this.cart.push({
                    id: -3,
                    name: this.taocan.map(item => `${item.name} * ${item.num}`).join(' + '),
                    price: 9,
                    num: 1,
                    img: 'https://zss666.top/images/两荤一素.png',
                    dec: '商品id: ' + this.taocan.map(item => `${item.id} `).join(' 、')
                })
            }
        }
    }
})
