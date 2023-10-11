import { defineStore } from "pinia";
import http from '../utils/request'
export const userInfo = defineStore('userinfo', {
    state: () => ({
        userInform: {},//用户详细数据
        token: null,
        loginstatus: false,//登录状态
        imgUrl: '',//用户头像
        nickname: '',//用户昵称

    }),
    getters: {
        local: (state) => {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (userinfo) {
                state.loginstatus = true;
                state.imgUrl = userinfo.imgUrl;
                state.token = userinfo.token;
                state.nickname = userinfo.nickName;
            }
        },

        outlogin: (state) => {
            localStorage.removeItem('userinfo')
            state.loginstatus = false;
            state.imgUrl = '';
            state.token = null;
            state.nickname = '';
        },

    },
    actions: {
        // 登录操作
        gologin(user, psw, code) {
            http.post('api/login', {
                status: '用户登录操作',
                data: {
                    username: user,
                    userpass: psw,
                    code
                }
            }).then(res => {
                console.log(res.data);
                this.loginstatus = true;
                this.userInform = res.data.data;
                this.imgUrl = res.data.data.imgUrl;
                this.nickname = res.data.data.nickName;
                //本地存储
                localStorage.setItem('userinfo', JSON.stringify(res.data.data,))
            })
        },

    }
}) 