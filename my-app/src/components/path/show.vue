<template>
    <headeritem></headeritem>
    <div v-if="router.currentRoute.value.name == 'path'">
        <van-empty description="当前地址为空" v-if="path().data.length == 0">
            <van-button round type="primary" class="bottom-button" @click="onAdd">新增地址</van-button>
        </van-empty>

        <van-address-list v-else v-model="path().checkid" :list="path().data" :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit"
            @click-item="path().changestauts()" />

    </div>
    <div><router-view></router-view></div>
</template>
<script setup >
import { provide } from 'vue';
import router from '../../router';
import headeritem from '../header-bar/index.vue'
import { path } from '../../pinia/path'
provide('title', '地址管理')
const disabledList = [
];
const onAdd = () => {
    path().add = true
    path().editor = [];
    router.push({ 'name': 'newpath' })
};
const onEdit = (item, index) => {
    path().changepath(index)
    router.push({ 'name': 'newpath' });
};
</script>
<style scoped lang="less">
.bottom-button {
    width: 160px;
    height: 40px;
}
</style>