<template>
    <div>
        <header-item></header-item>
    <van-form @submit="onSubmit">
        <van-field v-model="userInfo().nickname" name="昵称" label="昵称" placeholder="昵称"
            :rules="[{ required: true, message: '请填写新的昵称' }]" />
        <van-field name="radio" label="性别">
            <template #input>
                <van-radio-group v-model="userInfo().sex" direction="horizontal">
                    <van-radio name=0>男</van-radio>
                    <van-radio name=1>女</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field v-model="userInfo().tel" name="手机号" label="手机号" placeholder="手机号" disabled />
        <van-field name="uploader" label="头像">
            <template #input>
                <van-uploader v-model="img" reupload max-count="2" />
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    </div>
    
</template>
<script setup>
import { showToast } from 'vant';
import http from '../utils/request';
import headerItem from './header-bar/index.vue'
import { ref, provide } from 'vue';
import { userInfo } from '../pinia/userinfo';
provide('title', '修改信息')
const onSubmit = (values) => {
    console.log('submit', values.uploader[0].file);
    if ('objectUrl' in values.uploader[0]) {
        uploadImage(values.uploader[0].file);
        userInfo().imgUrl = `http://121.36.193.95:3000/images/` + values.uploader[0].file.name;
    }
    http.post('api/freshdata', {
        nickname: userInfo().nickname,
        sex: userInfo().sex,
        imgurl: userInfo().imgUrl,
    }).then((response) => (console.log(response.data)))

};
let img = ref([
    {
        url: userInfo().imgUrl,
        deletable: true,
        afterRead: () => {
            console.log(file);
            showToast('已经上传');
        },
    },

]);

function uploadImage(file) {
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('file', file);
    // 发起上传请求
    // 这里需要根据你的实际情况替换成你的上传接口地址
    http.post('api/uploadimg', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        // 上传成功后的处理逻辑
        console.log(response.data);

    }).catch(error => {
        // 上传失败后的处理逻辑
        console.error(error);
    });
}

</script>
<style lang="less" scoped></style>