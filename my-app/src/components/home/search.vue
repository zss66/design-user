<template>
    <van-nav-bar title="标题" left-text="" left-arrow @click-left="goback">

        <template #title>
            <form action="" @keydown.enter="golist">
                <input type="text" placeholder="搜索区" v-model="searchitem">
            </form>

        </template>
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    <div v-if="useRoute().name == 'slist'"><router-view>

        </router-view></div>
    <div v-else>
        <div class="hisshow" v-if="target">
            <div class="show">
                <h5>历史记录</h5>
                <h5 @click="removelist">清空记录</h5>
            </div>
            <div v-if="sealist">
                <div class="item" v-for="key in Object.keys(sealist) " :key="key">
                    {{ key }}
                </div>
            </div>

        </div>
        <div v-else>
            <p>暂无搜索记录</p>
        </div>
    </div>
    <footer_v></footer_v>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usedata } from '../../pinia/data';
import footer_v from '../footer.vue';
const route = useRoute();
const router = useRouter();
var target = ref(false);
const searchitem = ref();

var sealist = {};
// 读取本地存储信息，用于展示
if (localStorage.getItem('searchlist')) {
    target.value = true;
    sealist = JSON.parse(localStorage.getItem('searchlist'))
}
//搜索展示函数
const golist = () => {

    target.value = true;
    if (!localStorage.getItem('searchlist')) {
        localStorage.setItem('searchlist', '{}')
    }
    else {
        sealist = JSON.parse(localStorage.getItem('searchlist'))
    }
    console.log(typeof searchitem.value);
    if (!searchitem.value) return;
    if (sealist.hasOwnProperty(searchitem.value)) {
        // 如果存在已有的 key，则将对应的 value 加一
        sealist[searchitem.value] += 1;
    } else {
        // 如果不存在，则在对象中新建该 key，并设置初始值为 0
        sealist[searchitem.value] = 0;
    }
    localStorage.setItem('searchlist', JSON.stringify(sealist));
    //路由至子路由
    router.push({ name: 'slist' })
    usedata().dbconnect(searchitem.value)
}
//清除历史函数
const removelist = () => {
    localStorage.removeItem('searchlist')
    searchitem.value = '';
    sealist = {};
    target.value = false;
}
const reload = () => {

}
//后退箭头函数
const goback = () => {
    console.log('代码被执行了');
    router.push(route.name === 'search' ? '/' : '/search')
}
console.log(sealist);
</script>
<style scoped>
input {
    border-radius: 15px;
    width: 150px;
    height: 25px;
    background-color: #fff;
    text-indent: 0.5em;
    font-size: 15px;
    margin-right: 10px;
    border: #cdc6ce;
}

.show {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
}

.van-button {
    width: 25px;
    height: 30px;

}
</style>