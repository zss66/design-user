<template>
    <div>这是searchlist
        <div class="bar">
            <div>综合</div>
            <div class="barlp">价格
                <div>
                    <van-icon name="arrow-up" />
                    <van-icon name="arrow-down" />
                </div>
            </div>
            <div class="barlp">销量
                <div>
                    <van-icon name="arrow-up" />
                    <van-icon name="arrow-down" />
                </div>
            </div>
        </div>
        <likes></likes>
    </div>
</template>
<script setup>
import likes from '../home/likes.vue'
</script>
<style lang="less" scoped>
.bar {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    background-color: rgb(233, 235, 235);

    .barlp {
        display: flex;

        div {
            display: flex;
            flex-direction: column;
            font-size: 10px;

        }
    }
}
</style>