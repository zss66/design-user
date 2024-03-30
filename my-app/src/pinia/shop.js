import { defineStore } from "pinia";
import router from "../router";
import http from "../utils/request";
export const shop = defineStore('shop', {
    persist: true,
    state: () => ({
        data: ''
    }),
    getters: {

    },

    actions: {
        getshopId(id) {
            if (id) {
                http.get('api/shoper/info', {
                    params: {
                        id
                    }
                }).then(res => {
                    this.data = res.data
                    localStorage.setItem('shopdetail', JSON.stringify(res.data,))
                    router.push('/detail')
                })

            }
        }
    }
})
