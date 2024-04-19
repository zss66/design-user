import axios from "axios";
import { showLoadingToast, showToast, closeToast } from 'vant';
import webconfig from './global.config'
import { usedata } from "../pinia/data";
import { ref } from "vue";
import { userInfo } from "../pinia/userinfo";
import router from "../router";

const http = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    //token自动续期
    const requesttime = new Date();
    const logintime = new Date(userInfo().logintime)
    // 计算时间差（以毫秒为单位）
    const timeDifference = requesttime - logintime;
    // 一天的毫秒数
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    //设置刷新时间为12小时
    const refreshtime = 18 * 60 * 60 * 1000;

    if (timeDifference > refreshtime && timeDifference < oneDayInMillis) {
        console.log("已经到了刷新token的时间");
        userInfo().refresh()
        return
    }
    else if (timeDifference > oneDayInMillis) {
        userInfo().loginstatus = false;
        showToast('当前登录状态已经失效，请重新登录')
    }
    // 在发送请求之前做些什么
    let whiteList = webconfig.whiteListApi
    let url = config.url
    let token = userInfo().token
    //取消请求
    const controller = new AbortController();
    if (whiteList.indexOf(url) === -1 && token) {
        config.headers.token = token;
    }
    else {
        showToast('请登录之后再进行操作')
        controller.abort()
    }
    if (config.url !== 'api/paystuats') {
        // 设置定时器，规定时间后将标志变量设置为 true
        showLoadingToast({
            message: '请稍等',
            duration: 5000,
            forbidClick: true,
            loadingType: 'spinner'
        });
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    usedata().request_state = 1;
    closeToast(true)
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error.response.status==500);
    if(error.response.status==500){
        showToast('当前登录状态已失效，请重新登录');
        userInfo().loginstatus = false;
        userInfo().nologin;
        router.push('/login')
    }
    return Promise.reject(error);
});
export default http