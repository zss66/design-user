<template>
    <van-sticky>
        <Header></Header>
        <Tabnav></Tabnav>
    </van-sticky>
    <van-loading size="24px" vertical v-if="data.request_state = 0">加载中...</van-loading>
    <div class="contain" v-else>
        <div v-if="data.active == 0">
            <swiper></swiper>
            <icons></icons>
            <smalltitle></smalltitle>
            <showitem></showitem>
            <smalltitle></smalltitle>
            <likev></likev>
        </div>
    </div>
    <div class="footer">这是home</div>
    <footer_v></footer_v>
</template>
<script setup>
import showitem from '../components/home/showitem.vue';
import swiper from '../components/home/swiper.vue';
import icons from '../components/home/icons.vue';
import smalltitle from '../components/home/smalltitle.vue';
import footer_v from '../components/footer.vue';
import Header from '../components/home/header.vue';
import likev from '../components/home/like.vue';
import Tabnav from '../components/home/tabnav.vue';
import { usedata } from '../pinia/data';

const data = usedata();
data.getdata();


// http.get('api/data').then(res => {
//     console.log(res);
//     data.getdata(res);
//     data.bol = true;
//     // state.topBar = res.data.data.topBar;
//     // state.swiper = res.data.data.swiper;
//     // state.icon = res.data.data.icon;
//     // state.showitem = res.data.data.recomnd;
//     // state.like = res.data.data.like;

// })
</script>
<style lang="less" scoped>
.van-loading--vertical {
    justify-content: center;
    height: 70vh;
}

.footer {
    padding-bottom: 55px;
}
</style>