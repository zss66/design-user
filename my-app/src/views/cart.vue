<template>
    <header-cart>
        <span @click="">编辑</span>
    </header-cart>
    <!-- 主体部分 -->
    <div class="cartbody">
        <!-- 空白页内容 -->
        <div v-if="false">
            <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                description="描述文字" />
        </div>
        <!-- 内容页 -->
        <div v-if="true">
            <van-checkbox v-model="checked">复选框</van-checkbox>
            <van-card num="2" price="2.00" desc="描述信息" title="商品标题"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
                <template #num>
                    <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                </template>
                <template #tags>
                    <van-tag plain type="primary">标签</van-tag>
                    <van-tag plain type="primary">标签</van-tag>
                </template>
                <template #footer>
                    <van-button size="mini">按钮</van-button>
                    <van-button size="mini">按钮</van-button>
                </template>
            </van-card>

        </div>


    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
        <template #tip>
            你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template>
    </van-submit-bar>
</template>
<script setup>
import { showToast } from 'vant'
import { provide, ref } from 'vue';
import headerCart from '../components/header-bar/index.vue';
provide('righticon', true)
provide('title', '购物车')
const checked = ref(true)
const onSubmit = () => {
    showToast('点击按钮')
}
    ;
const onClickLink = () => showToast('修改地址');
</script>
<style scoped lang="less">
.cartbody {
    margin: 10px 10px;
}
</style>