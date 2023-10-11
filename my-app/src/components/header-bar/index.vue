<template>
    <header-bar>
        <van-icon name="arrow-left" @click="router.back()" />
        <div>{{ title }}</div>
        <slot></slot>
        <van-icon v-if="!right" name="wap-home" @click="router.push('/')" />
    </header-bar>
</template>
<script setup>
import router from '../../router';
import { inject } from 'vue';
const right = inject('righticon', false);
const title = inject('title', '');
const rightclick = () => {

};

</script>