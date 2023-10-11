<template>
    <headeritem>
    </headeritem>
    <header style="width: 100vw;height: 150px;background-color: aquamarine;">
        <div v-if="userInfo().loginstatus" class="user">
            <img :src="userinfo.imgUrl.value" alt="头像">
            <span>{{ userinfo.nickname.value }}</span>
        </div>
        <van-button @click="router.push('/login')" v-else>注册/登录</van-button>
    </header>
    <div>
        <van-cell title="地址管理" is-link to="index" />
        <van-cell title="路由跳转" is-link to="index" />
        <van-cell title="退出登录" is-link @click="outlogin()" />
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

const userinfo = storeToRefs(userInfo());
const loginstatus = userinfo.loginstatus;
onBeforeMount(() => {
    userinfo.local.value
})
const outlogin = () => {
    localStorage.removeItem('userinfo');
    window.location.reload();
}
// 


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