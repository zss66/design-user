<template>
    <headeritem></headeritem>
    <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="(items, index) in order().ordertab" :title="items" :key="index">
            <div v-for="item in order().orderlist[index]" :key="index" style="display:flex;">
                <van-card :price="item.goods_price" desc="描述信息" :title="item.goods_name" :thumb="item.goods_imgUrl"
                    style="flex:1" :num="item.goods_num">
                    <template #tags>
                        <van-tag plain type="primary">{{ order().ordertab[item.order_status - 1] }}</van-tag>
                        <van-tag plain type="primary">{{ item.order_id }}</van-tag>

                    </template>
                    <template #footer>
                        <div v-if="item.order_status == 2"
                            @click="payorder(item.order_id, cart().data.data.filter(itema => itema.id == item.cartid), item.payurl)">
                            <van-button size="mini">去付款</van-button>
                        </div>
                        <div v-if="item.order_status == 3"
                            @click="okpay(item.order_id)">
                            <van-button size="mini">确认收货</van-button>
                        </div>

                    </template>
                </van-card>

            </div>
        </van-tab>
    </van-tabs>
    <van-dialog v-model:show="showalert" title="支付宝扫码支付" :showConfirmButton=false
        style="display: flex; justify-content: center;flex-direction: column;align-items: center;" close-on-click-overlay>
        <qrcode :value=qrdata color: :size="200" style="margin-bottom: 30px;" type="image/png" color="#fff"></qrcode>
    </van-dialog>
</template>
<script setup>
import Qrcode from 'vue-qrcode';
import headeritem from '../header-bar/index.vue'
import { order } from '../../pinia/order'
import { provide } from 'vue';
import { cart } from '../../pinia/cartinfo';
import { ref } from 'vue';
import router from '../../router';
import http from '../../utils/request';
provide('title', '订单管理')
order().getdata()
const showalert = ref(false)
const qrdata = ref('');
const okpay = (id) => {
    http.post('api/okpay', { id: id }).then(res => {
        console.log(res.data)
    })
}
const payorder = (id, goods, url) => {
    showalert.value = true;
    qrdata.value = url
    var timer = setInterval(function () {
        // 在组件卸载前取消定时器
        if (router.currentRoute.value.name !== 'myorder') {
            clearInterval(timer);
            return;
        }
        http.post('api/paystuats', { id: id, goods: goods }).then(res => {
            console.log(res.data)
            if (res.data.code == '10000') {
                switch (res.data.tradeStatus) {
                    case 'WAIT_BUYER_PAY':
                        console.log('交易创建，等待买家付款');
                        break;
                    case 'TRADE_CLOSED':
                        {
                            console.log('未付款交易超时关闭，或支付完成后全额退款');
                            clearInterval(timer);
                        }

                        break;
                    case 'TRADE_SUCCESS': {
                        console.log('交易支付成功');
                        clearInterval(timer);
                        showalert.value = false;
                        cart().selectdata = [];
                    }
                        break;
                    case 'TRADE_FINISHED':
                        console.log('交易结束，不可退款');
                        break;
                    default:
                        // 如果状态都不匹配，则执行以下代码块
                        console.log('未知交易状态');
                }
            }
        })
    }, 5000);
}
</script>
<style lang="less" scoped></style>