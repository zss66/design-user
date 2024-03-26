<template>
    <van-tabbar v-model="footerdata.active_footer" route>
        <van-tabbar-item push to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item push to="/cart" icon="cart">购物车</van-tabbar-item>
        <van-tabbar-item push to="/mine" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { usedata } from '../pinia/data'
const footerdata = usedata();
</script>
<style lang="less" scoped></style>