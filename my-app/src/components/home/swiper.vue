<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="i in usedata().swiper.data" :key="i.id"><img :src="i.imgUrl" style="width: 100vw;height:200px ;
        " />
        </van-swipe-item>
    </van-swipe>
</template>
<script setup>
import { usedata } from '../../pinia/data';
</script>
<style scoped></style>