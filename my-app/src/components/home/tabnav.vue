<template>
    <van-tabs v-model:active="datastore.active">
        <van-tab v-for="(item ) in datastore.topBar" :title="item.label">
        </van-tab>
    </van-tabs>
</template>
<script setup>
import { usedata } from '../../pinia/data'
const datastore = usedata();

</script>
<style scoped>
.van-tabs {

    border-radius: 5px;
}
</style>