<!--
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-03-21 15:10:24
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-30 17:51:50
 * @FilePath: /desktop-tutorial/my-app/src/views/mine.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <headeritem>
    </headeritem>
    <header style="width: 100vw;height: 150px;background-color: aquamarine;">
        <div v-if="userInfo().loginstatus" class="user" @click="router.push('/myinfo')">
            <img :src="userInfo().imgUrl" alt="头像">
            <span>{{ userInfo().nickname }}</span>
        </div>
        <van-button @click="router.push('/login')" v-else>注册/登录</van-button>
    </header>
    <van-tabs v-model:active="order().active" swipeable @click="router.push('/myorder')">
        <van-tab v-for="index in order().ordertab" :title="index">
        </van-tab>
    </van-tabs>
    <div>
        <van-cell title="地址管理" is-link to="/path" />
        <van-cell title="退出登录" is-link @click="userInfo().outlogin" />
    </div>

    <Footer></Footer>
</template>
<script setup>
import router from '../router';
import Footer from '../components/footer.vue';
import headeritem from '../components/header-bar/index.vue'
import { userInfo } from '../pinia/userinfo';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { order } from '../pinia/order'
if (userInfo().loginstatus) {
    userInfo().freshdata()
}

</script>
<style scoped lang="less">
header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin-bottom: 10px;
        width: 50px;
        border-radius: 50%;
    }

    span {
        font-size: small;
    }
}
</style>