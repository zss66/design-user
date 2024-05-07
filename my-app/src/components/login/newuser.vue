<template>
    <div>
        <header-bar>
            <van-icon name="arrow-left" @click="router.back" />
            <div>用户注册页</div>
            <van-icon name="wap-home" @click="router.push('/')" />
        </header-bar>
        <van-form @failed="onFailed" @submit="onMounted" style="padding-top: 20px;">
            <van-cell-group inset>
                <!-- 通过 pattern 进行正则校验 -->
                <van-field label="昵称" v-model="value1" name="正则检验pattern" placeholder="6-12个字符"
                    :rules="[{ pattern: pattern1, message: '请输入正确内容' }]" />
                <!-- 通过 validator 进行函数校验 -->
                <van-field label="手机号" v-model="value2" name="validator" placeholder="仅支持中国大陆手机号"
                    :rules="[{ validator, message: '格式错误' }]" >
                    <template #button>
                            <van-button size="small" type="primary" @click="getcode" :disabled='disabled' >{{ codemsg }}</van-button>
                        </template>
                </van-field>
                <!-- 通过 validator 返回错误提示 -->
                <van-field label="短信验证码" v-model="value4" name="短信" placeholder="4位验证码" :rules="[{
                pattern:
                    msgcode, message: '4位有效数字'
            }]" />
                <van-field label="密码" v-model="value3" name="validatorMessage" placeholder="至少8位"
                    :rules="[{ validator: validator1, message: '必须同时包含字母和数字' }]" />
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
    </div>
</template>
<script setup>
import { showToast } from 'vant';
import router from '../../router';
import http from '../../utils/request'
import { ref } from 'vue';
// import { closeToast, showLoadingToast } from 'vant';
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const disabled=ref(false)
const codemsg=ref('发送验证码')
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

const getcode = () => {
    console.log('已经点击了');
    //先验证号码格式是否正确   17677465300
    if (!value2.value) return;
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
            phone: value2.value,
            message: '获取短信验证码'
        }
    })
}
const onMounted = () => {
    console.log('点击操作');
    http.post('api/zhuce', {
        nicheng: value1.value,
        phone: value2.value,
        password: value3.value,
        msgcode: value4.value
    }).then(function (response) {
        console.log(response);
        if(response.data.status==200){
            router.push('/login')
            showToast('账号注册成功')
        }
        else if (response.data.status==304){
            showToast(response.data.message)
        }
        else{
            showToast('服务异常，请联系技术人员')
        }
       
    })
        .catch(function (error) {
            console.log(error);
        });
}


</script>
<style scoped lang="less"></style>