<template>
    <header-bar>
        <van-icon name="arrow-left" />
        <div>用户注册页</div>
        <van-icon name="wap-home" />
    </header-bar>
    <van-form @failed="onFailed" @submit="onMounted">
        <van-cell-group inset>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field label="昵称" v-model="value1" name="正则检验pattern" placeholder="最多不超过12个字符"
                :rules="[{ pattern: pattern1, message: '请输入正确内容' }]" />
            <!-- 通过 validator 进行函数校验 -->
            <van-field label="手机号" v-model="value2" name="validator" placeholder="函数校验"
                :rules="[{ validator, message: '请输入正确内容' }]" />
            <!-- 通过 validator 返回错误提示 -->
            <van-field label="密码" v-model="value3" name="validatorMessage" placeholder="校验函数返回错误提示"
                :rules="[{ validator: validator1, message: '请输入正确内容' }]" />
            <van-field label="短信验证码" v-model="value4" name="短信" placeholder="4位验证码" :rules="[{
                pattern:
                    msgcode, message: '请输入正确内容'
            }]" />
            <!-- 通过 validator 进行异步函数校验 -->
            <!-- <van-field v-model="value4" name="asyncValidator" placeholder="异步函数校验"
                :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]" /> -->
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
            <br>
            <van-button round block type="primary" native-type="submit" to="/login">
                切换到登录
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
import http from '../../utils/request'
import { ref } from 'vue';
// import { closeToast, showLoadingToast } from 'vant';
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
// const value4 = ref('');
const pattern1 = /^.{6,12}$/;
const msgcode = /^\d{4}$/;
// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => /^1[23456789]\d{9}$/.test(val);
// 校验函数可以直接返回一段错误提示
const validator1 = (val) => /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/.test(val);//(?=.*[@#$%^&+=!])匹配特殊字符
const validatorMessage = (val) => `${val} 不合法，请重新输入`;

// 校验函数可以返回 Promise，实现异步校验
// const asyncValidator = (val) =>
//     new Promise((resolve) => {
//         showLoadingToast('验证中...');

//         setTimeout(() => {
//             closeToast();
//             resolve(val === '1234');
//         }, 1000);
//     });

const onFailed = (errorInfo) => {
    console.log('failed', errorInfo);
};
const onMounted = () => {
    console.log('点击操作');
    http.post('api/zhuce', {
        nicheng: value1.value,
        phone: value2.value,
        password: value3.value,
        msgcode: value4.value
    }).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}


</script>
<style scoped lang="less"></style>