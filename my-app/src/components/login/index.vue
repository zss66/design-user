<template>
    <headeritem>
    </headeritem>
    <!-- <div style="height: 46px;background-color: rgb(188, 61, 93); text-align: center;line-height: 46px;">这是登录注册页</div> -->


    <!-- 这是vantui的form 表单   现在这里不使用这个组件，使用自己的 -->
    <van-form @submit="onSubmit" v-if="false">
        <van-cell-group inset>
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <!-- 自己的form表单 -->
    <form action="">
        <div class="formkuang">
            <input type="text" class="input" placeholder="请输入手机号" v-model="userTel" @blur="validata(userTel, 0)">
            <input v-if="staut == 0" type="text" class="input" placeholder="请输入密码" v-model="userPwd"
                @blur="validata(userPwd, 1)">
            <div v-else style="display: flex;  align-items: center;">
                <input type="text" class="input" placeholder="请输入验证码" v-model="msgccode">
                <button :disabled="disabled"
                    style="font-size: small;background-color: brown;white-space: nowrap; height: 30px;"
                    @click="getcode()">{{ codemsg }}</button>
            </div>


            <van-button @click="gotest()">点击登录</van-button>
            <div class="gongneng">
                <span @click="router.push({ name: 'zhuce' })">点击注册</span>
                <span @click="gochange(staut)">密码登录/验证码登录</span>
                <span @click="router.push('/find')">忘记密码</span>
            </div>

        </div>


    </form>
</template>
<script setup>
import { onMounted, onUpdated, provide, ref } from 'vue';
import headeritem from '../header-bar/index.vue'
import router from '../../router'
import { userInfo } from '../../pinia/userinfo'
import http from '../../utils/request';
provide('title', '登录/注册页')
const userTel = ref('');
const userPwd = ref('');
//登录状态识别码
var staut = ref(0);
//用户短信验证码输入
const msgccode = ref('');
//短信禁用按钮
const disabled = ref(false);

const codemsg = ref('获取短信验证码')

// const onSubmit = (values) => {
//     console.log('submit', values);
// };
const rules = [{
    rule: /^1[23456789]\d{9}$/,
    msg: '手机号不能为空，且为11位数字',
    value: false

},
{
    rule: /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/,
    msg: '密码不能为空，并且是8-16位',
    value: false

},]
//表单验证
function validata(key, index) {
    if (rules[index].rule.test(key)) { rules[index].value = true }
    else {
        rules[index].value = false
        console.log(rules[index].msg);
    }
}
//登录操作
const gotest = () => {
    let bool = true
    if (staut.value == 0) {
        rules.forEach(element => {
            if (!element.value) {
                bool = false
            }
        });
    }
    else {
        if (!rules[0].value) {
            bool = false
        }
    }
    if (bool) {
        console.log('操作已经完成');
        userInfo().gologin(userTel.value, userPwd.value, msgccode.value);
        router.push('/mine')
    }
}
//切换登陆方式
const gochange = (code) => {
    //点击切换操作时，清除保留的验证码信息
    msgccode.value = '';
    userPwd.value = '';
    if (code == 0) {
        staut.value = 1
    }
    else {
        staut.value = 0
    }
    console.log(staut.value);
}
//获取短信验证码操作
const getcode = () => {
    console.log('已经点击了');
    //先验证号码格式是否正确   17677465300
    if (!rules[0].value) return;
    //点击之后，禁用点击操作
    let time = 6;
    disabled.value = true;
    let timer = setInterval(() => {
        --time;
        codemsg.value = `剩余${time}可以操作`
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        time = 6;
        disabled.value = false;
        codemsg.value = '获取短信验证码';
    }, 6000)
    http.get('api/getcode', {
        params: {
            phone: userTel.value,
            message: '获取短信验证码'
        }
    }).then(res => {
        console.log(res);
    })
}
// onUpdated(() => {
//     console.log(bool.value);
// })

// const validata = (value, key) => {
//     if (value.test(key.rule)) return
//     else {
//         return key.msg
//     }
// }
</script>
<style scoped lang="less">
.gongneng {
    display: flex;
    justify-content: space-between;
    font-size: small;
    height: 30px;
    align-items: center;
    margin-top: 20px;
    color: rgb(228, 30, 13);
}

.formkuang {
    width: 90vw;
    margin: 20px auto;

    .input {
        border: none;
        width: 100%;
        margin: 10px 0;
        box-sizing: border-box;
        font-size: 15px;
        line-height: 40px;
        padding: 0 10px;
    }

    .van-button {
        width: 100%;
    }
}
</style>