<template>
    <div class="contain">
        <div v-for="(item, index) in usedata().icon.data" :key="index">
            <div id="inner"><img :src="item.imgUrl" alt="icons">
                <span>{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { usedata } from '../../pinia/data';
</script>
<style scoped>
div.contain {
    box-sizing: border-box;
    background-color: #e6e2e2;
    padding: 5px 15px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

div#inner {

    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px
}

img {
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
}
</style>
