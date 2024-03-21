<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="i in 3" :key="i"><img :src="'src/assets/images/swiper' + i + '.jpeg'" style="width: 100vw;
        " />
        </van-swipe-item>
    </van-swipe>
</template>
<script setup>
</script>
<style scoped></style>