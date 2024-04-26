<template>
    <div>
        <header-cart>
            <span @click="editor" class="allbutton">{{ value }}</span>
        </header-cart>
        <!-- 主体部分 -->
        <div class="cartbody">
            <!-- 内容页 -->
            <div v-if="typeof cart().data !== 'undefined' && cart().data.data.length > 0">
                <div>
                    <!-- 遍历每个店铺 -->
                    <div v-for="(shopItems, shopId) in cart().groupedCartData()" :key="shopId"
                        style="margin: 10px 5px;background-color: #fff; border-radius: 10px;">

                        <div v-for="item in shopItems" :key="item.id" style="display:flex;">
                            <van-checkbox :name="item.id" v-model="item.checked"
                                @click="cart().checkeds(item.id, item.checked);"></van-checkbox>
                            <van-card :price="item.goods_price" :desc="item.goodsdec" :title="item.goods_name"
                                :thumb="item.goods_imgUrl" style="flex:1">
                                <template #num>
                                    <van-stepper v-model="item.goods_num" theme="round" button-size="22" disable-input
                                        @click="cart().updatanum(item.id, item.goods_num)" />
                                </template>
                                <template #tags>
                                    <!-- 显示商品ID -->
                                    <van-tag plain type="primary">id</van-tag>
                                    <van-tag plain type="primary">{{ item.goods_id }}</van-tag>
                                </template>
                            </van-card>
                        </div>
                    </div>
                </div>





                <van-submit-bar v-if="!change" :price="cart().totalprice * 100 || 0" button-text="提交订单"
                    @submit="onSubmit1">
                    <van-checkbox v-model="cart().all" @click="checkbox">全选</van-checkbox>
                    <!-- 当当前地址不适合时,提醒用户更改地址 -->
                    <!-- <template #tip>
            你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template> -->
                </van-submit-bar>
                <van-submit-bar v-else button-text="删除" @submit="onSubmit2" class='del'>
                    <template #default>
                        <van-checkbox v-model="cart().all" @click="checkbox">全选</van-checkbox>
                    </template>
                    <!-- 当当前地址不适合时,提醒用户更改地址 -->
                    <!-- <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template> -->
                </van-submit-bar>
            </div>
            <!-- 空白页内容 -->
            <div v-else>
                <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="描述文字" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { datePickerProps, showToast } from 'vant'
import { provide, ref } from 'vue';
import headerCart from '../components/header-bar/index.vue';
import router from '../router';
import { cart } from '../pinia/cartinfo'
import { usedata } from '../pinia/data';
provide('righticon', true)
provide('title', '购物车')
const value = ref('编辑');
const change = ref(false)
console.log(cart().groupedCartData());
const onSubmit1 = () => {
    // console.log(cart().checkShop());
    if (cart().selectdata.length > 0) {
        if (cart().checkShop()) {
            usedata().shopselect = usedata().likes.data.filter(i => i.id == cart().selecid[0])[0]
            usedata().shopoffers()
            router.push('/order')
        }
        else {
            showToast({
                message: '当前不支持多家店铺混合购买',
                duration: 1000,
                forbidClick: true
            });
        }
    }
    else {
        showToast('当前未选择商品')
    }
}
const onSubmit2 = () => {
    // showToast('删除操作')
    cart().delcart()
}
// 监听数据变化

//编辑删除操作
const editor = () => {
    change.value = !change.value
    change.value ? value.value = '完成' : value.value = '编辑'
    cart().statuschange();
}
const onClickLink = () => showToast('修改地址');
//监听步进值，及时修改后台商品数量值

//全选操作
const checkbox = () => {
    if (cart().all == false) {
        cart().data.data.forEach(element => {
            element.checked = false
        });
    }
    else {
        cart().data.data.forEach(element => {
            element.checked = true
        });
    }
    cart().statuschange()
}
</script>
<style scoped lang="less">
.van-checkbox {
    font-size: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif
}

.del :deep(.van-submit-bar__bar) {
    justify-content: space-between;
}

.allbutton {
    font-size: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.cartbody {
    margin: 10px 10px;
}
</style>