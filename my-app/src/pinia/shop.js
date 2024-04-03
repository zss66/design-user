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
        refreshdata: (state) => {
            let istrue = false
            state.data.forEach(i => {
                Object.values(i)[0].forEach(v => {
                    if (v.num != 0) {
                        istrue = true
                    }
                })
            })
            if (istrue) {
                state.taocan = [],
                    state.taocanprice = 0,
                    state.choice = []
            }

        }

    },

    actions: {
        getshopId(item) {
            if (item) {
                this.shopselect = item
                http.get('api/getclass', {
                    params: {
                        shopid: item.id
                    }
                }).then(res => {

                    this.data = res.data.data.sort((a, b) => {
                        return a.classid - b.classid;
                    });
                    router.push('/detail')
                })
            }
        },

    }
})
