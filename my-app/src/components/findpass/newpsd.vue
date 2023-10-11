<template>
    <van-form @submit="gonew()" @failed="failed">
        <van-cell-group inset>
            <van-field v-model="psd" name="psd" placeholder="请输入密码" :rules="[{ pattern: pattern1, message: '请输入正确内容' }]" />
            <van-field v-model="psds" name="psds" placeholder="请确认密码"
                :rules="[{ validator: validator1, message: '两次输入不一致，请重新输入' }]" />
        </van-cell-group>
        <van-button size="large" type="primary" style="height: 40px;" native-type="submit">确认修改</van-button>
    </van-form>
</template>
<script setup>
import http from '../../utils/request'
import { inject, ref } from 'vue';
const psd = ref('')
const psds = ref('')
const pattern1 = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/
const validator1 = (val) => psd.value === val;
const phone = inject('phone');
const sms = inject('sms');
console.log(phone);
const gonew = () => {
    console.log('点击了');
    http.post('api/newpsd', {
        phone: phone.value,
        sms: sms.value,
        psd: psd.value
    }).then(res => {
        console.log(res);
    })
}
const failed = (err) => {

    console.log(err);
}
</script>
<style lang="less" scoped></style>