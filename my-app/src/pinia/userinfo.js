import { defineStore } from "pinia";
import http from '../utils/request'
export const userInfo = defineStore('userinfo', {
    persist: true,
    state: () => ({
        token: null,
        loginstatus: false,//登录状态
        imgUrl: '',//用户头像
        nickname: '',//用户昵称
        sex: 0,
        tel: '',
        logintime: Date,
    }),
    getters: {
        nologin: (state) => {
            if (!state.loginstatus) {
                state.userInform = '';
                state.token = null;
                state.imgUrl = '';
                state.nickname = '';
                state.logintime = '';
                state.tel = '';
            }
        }
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
                this.logintime = new Date();
                console.log(this.logintime);
                this.loginstatus = true;
                this.imgUrl = res.data.data.imgUrl;
                this.nickname = res.data.data.nickName;
                this.token = res.data.data.token;
                this.sex = res.data.data.sex;
                this.tel = res.data.data.tel;

            })
        },
        refresh() {
            console.log('已经操作');
            http.post('api/refreshtoken').then(res => this.token = res.data.token)
            this.logintime = new Date()
        },
        freshdata(data) {
            http.post('api/freshdata', data).then(res => {
                console.log(res);
                this.imgUrl = res.data.data.imgUrl;
                this.nickname = res.data.data.nickName;
                this.sex = res.data.data.sex;
                this.tel = res.data.data.tel;
                this.token = res.data.data.token;
            })
        },
        //退出登录
        outlogin() {
            this.loginstatus = false;
            this.imgUrl = '';
            this.token = null;
            this.nickname = '';
        },
    }
}) 