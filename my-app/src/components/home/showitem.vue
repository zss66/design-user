<template>
    <div class="contain" v-for="(item, index) in usedata().showitem.data" :key="index">
        <div class="title">畅销款</div>
        <img :src="item.imgUrl" alt="img">
        <div class="miaoshu">
            <span>{{ item.name }}</span>
            <b>{{ item.content }}</b>
            <p>￥ {{ item.price }}</p>
        </div>
    </div>
</template>
<script setup>
import { usedata } from '../../pinia/data';


</script>
<style lang="less" scoped>
.contain {
    position: relative;
    display: flex;
    font-size: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 130px;
    background-color: #c8e2e2;
    border-radius: 5px;
    margin-bottom: 5px;

    .title {
        position: absolute;
        z-index: 1;
        left: 20px;
        color: aliceblue;
        top: 0;
        height: 25px;
        padding: 0 10px;
        border-end-start-radius: 5px;
        border-end-end-radius: 5px;
        background-color: #D4C0A7;
    }

    img {
        width: 150px;
    }

    .miaoshu {
        display: flex;
        flex-direction: column;
        align-items: end;

        p {
            color: red;
        }
    }
}
</style>