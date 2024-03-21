<template>
    <header-bar>
        <van-icon name="arrow-left" @click="router.back()" />
        <div>找回密码</div>
        <van-icon name="wap-home" />
    </header-bar>
    <div style="margin-top:20px;" v-if="router.currentRoute.value.fullPath != '/find/newpsd'">
        <van-form @submit="gonext()">
            <van-cell-group inset>
                <van-field v-model="value" name="phone" placeholder="请输入手机号"
                    :rules="[{ pattern: pattern1, message: '请输入正确内容' }]" />
                <van-field v-model="sms" center clearable placeholder="请输入短信验证码"
                    :rules="[{ pattern: pattern2, message: '请输入4位有效数字' }]">
                    <template #button>
                        <van-button size="small" :aria-disabled="disabled" @click="getcode" type="primary">{{ codemsg
                        }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <van-button size="large" type="primary" style="height: 40px; " native-type="submit">下一步</van-button>

        </van-form>

    </div>
    <div>
        <router-view></router-view>
    </div>
</template>
<script setup>
import router from '../../router';
import { provide, ref } from 'vue';
import http from '../../utils/request'
const value = ref('');
const sms = ref('');
const disabled = ref(false);
const pattern1 = /^1[23456789]\d{9}$/
const pattern2 = /^\d{4}$/
const codemsg = ref('发送验证码')
console.log(router.currentRoute.value.fullPath);
const getcode = () => {
    console.log('已经点击了');
    //先验证号码格式是否正确   17677465300
    if (pattern1.test(value.value)) {
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
                phone: value.value,
                message: '获取短信验证码'
            }
        }).then(res => {
            console.log(res);
        })
    }
    else console.log('手机号输入有误！');

}
//透传数据
provide('phone', value)
provide('sms', sms)
const gonext = () => {

    router.push({
        name: 'newpsd'
    })
}
</script>
<style lang="less" scoped></style>