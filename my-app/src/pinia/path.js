import { defineStore } from "pinia";
import http from '../utils/request'
import { showToast } from 'vant'
export const path = defineStore('path', {

    state: () => ({
        checkid: null,
        editor: [],
        data: [],
        default: {},
        add: false
    }),
    getters: {
        nodata: (state) => {
            if (state.data.length == 0) {
                state.checkid = null;
                state.editor = [];
                state.default = {};
                state.add = true;
            }
        },

    },
    actions: {
        getpath() {
            http.post('api/path').then(res => {
                this.data = res.data.data.data
                res.data.data.data.forEach(element => {
                    element.address = element.province + element.city + element.county + element.addressDetail
                    if (element.isDefault) {
                        this.default = element;
                        this.checkid = element.id
                        this.add = false
                    };
                });
            }
            )
        },
        changepath(index) {
            this.editor = this.data[index]
        },
        async changestauts(id) {
            try {
                const response = await http.post('api/changestauts', {
                    id: id || this.checkid,
                    uid: this.data[0].uId
                });
                console.log(response.data);
                this.getpath();
            } catch (error) {
                console.log(error);
            }
        }
    }
})