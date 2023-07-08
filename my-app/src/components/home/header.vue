<template>
    <div class="contain">
        <img src="../../assets/images/logo.png" alt="logo">
        <div style="display:flex ;align-items: center;">
            <input type="text" placeholder="搜索区">
            <van-button round type="success" @click="router.replace('/search')"> <van-icon name="search" /></van-button>

        </div>

        <van-icon name="chat-o" />
    </div>
</template>
<script setup>
import router from '../../router';
</script>
<style lang="less" scoped>
.contain {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    background-image: linear-gradient(90deg, #a9d9eb, 50%, #cdc6ce);
    justify-content: space-around;


    input {
        border-radius: 15px;
        width: 150px;
        height: 25px;
        background-color: #fff;
        text-indent: 0.5em;
        font-size: 15px;
        margin-right: 10px;
        border: #cdc6ce;
    }

    .van-button {
        width: 25px;
        height: 30px;

    }

    img {
        width: 40px;
        height: 40px;
    }
}
</style>