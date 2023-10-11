<template>
    <div class="contain" v-if="usedata().search == []">
        <img src="../../assets/images/like.jpeg" alt="">
        <div class="miaoshu">
            <van-text-ellipsis content="text" />
            <b>￥ 68</b>
        </div>
    </div>

    <div v-else class="contains">
        <div class="contain" v-for="(item, index) in usedata().search" :key="index">
            <img :src=item.imgUrl alt="png">
            <div class="miaoshu">
                <van-text-ellipsis :content=item.name />
                <b>￥{{ item.price }}</b>
            </div>
        </div>
    </div>
</template>
<script setup>
import { usedata } from '../../pinia/data';
</script>
<style lang="less" scoped>
.contains {
    display: flex;
    flex-wrap: wrap;
}

.contain {
    display: flex;
    margin: 5px 10px;
    flex-direction: column;
    width: 155px;
    font-size: 15px;

    img {
        width: 160px;
        border-radius: 10%;
    }

}
</style>