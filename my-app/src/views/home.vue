<template>
    <van-sticky>
        <Header></Header>
      
    </van-sticky>
    <van-loading size="24px" vertical v-if="data.request_state = 0">加载中...</van-loading>
    <div class="contain" v-else>
        <div v-if="data.active == 0">
            <swiper></swiper>
            <icons></icons>
            <smalltitle :smalltitle="'爆款推荐'">
            </smalltitle>
            <showitem></showitem>
            <smalltitle :smalltitle="'商家列表'">
            </smalltitle>
            <likev></likev>
        </div>
    </div>
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
import { onBeforeUnmount } from 'vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
const scrollTop = ref(0);
// 在组件销毁前保存滚动位置
onBeforeRouteLeave((to, from) => {
    // 在离开路由前保存滚动位置到 session 或 local storage
    sessionStorage.setItem('scrollhome', JSON.stringify(window.scrollY));
})
const data = usedata();
data.getdata();
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