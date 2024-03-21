<template>
    <div class="contain">
        <img src="../../assets/images/logo.png" alt="logo">
        <span>食堂餐饮系统</span>
        <div style="display: flex; align-items: center; ">
            <van-button round type="success" @click="router.replace('/search')"> <van-icon name="search" /></van-button>
            <van-icon name="chat-o" style="margin-left:15px ; font-size: 0.7rem;" />
        </div>


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
    justify-content: space-between;


    span {
        font-size: 15px;
        letter-spacing: 3px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 700;
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