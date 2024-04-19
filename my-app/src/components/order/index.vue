<template>
    <headeritem></headeritem>
    <div class="path">
        <span>地址选择：</span>
        <van-address-list v-if="Object.keys(path().default).length !== 0" v-model="chosenAddressId" :show-add-button="false"
            :list=[path().default] :disabled-list="null" disabled-text="" :default-tag-text="null" :switchable="false"
            @click-item="router.push({ 'name': 'path' })" />
        <div v-else
            style="height: 80px; display: flex;flex-direction: column; justify-content: center;align-items: center;">

            <van-button round type="primary" size="small" style="padding: 0 20px;" @click=" path().add = true
            path().editor = [];
            router.push({ 'name': 'newpath' })">新增地址</van-button>
        </div>
    </div>
    <div class="paystyle">
        <div>支付方式：</div>
        <van-radio-group v-model="payway" direction="horizontal">
            <van-radio name="1">微信支付</van-radio>
            <van-radio name="2">支付宝</van-radio>
        </van-radio-group>
    </div>

    <div v-for="item in cart().data.data" :key="item.id">
        <div v-if="cart().selectdata.includes(item.id)" style="width: 100%;">
            <van-card :price="item.goods_price" desc="描述信息" :title="item.goods_name" :thumb="item.goods_imgUrl">
                <template #num>
                    <van-stepper v-model="item.goods_num" theme="round" button-size="22" disable-input
                        @click="cart().updatanum(item.id, item.goods_num)" />
                </template>
                <template #tags>
                    <van-tag plain type="primary">id</van-tag>
                    <van-tag plain type="primary">{{ item.goods_id }}</van-tag>
                </template>
                <!-- <template #footer>
                        <van-button size="mini">按钮</van-button>
                        <van-button size="mini">按钮</van-button>
                    </template> -->
            </van-card>
        </div>

    </div>
    <van-dialog v-model:show="showalert" title="支付宝扫码支付" :showConfirmButton=false
        style="display: flex; justify-content: center;flex-direction: column;align-items: center;" close-on-click-overlay>
        <qrcode :value=qrdata color: :size="200" style="margin-bottom: 30px;" type="image/png" color="#fff"></qrcode>
    </van-dialog>

    <van-submit-bar :price="cart().totalprice * 100 || 0" button-text="提交订单" @submit="creatorder()">
        <!-- 当当前地址不适合时,提醒用户更改地址 -->
        <!-- <template #tip>
            你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template> -->
    </van-submit-bar>
</template>
<script setup>
import headeritem from '../header-bar/index.vue'
import { provide } from 'vue';
import { ref } from 'vue';
import http from '../../utils/request';
import { cart } from '../../pinia/cartinfo';
import Qrcode from 'vue-qrcode';
import { path } from '../../pinia/path';
import router from '../../router';
provide('title', '提交订单')
const chosenAddressId = ref('1');
const payway = ref('1')
const showalert = ref(false)
const qrdata = ref('');
let paysuccess = 0
let oldorder = {
    id: '',
    goods: [],
    path: ''
}

const creatorder = () => {
    showalert.value = true
    const order_id = cart().data.data[0].uId + new Date().getTime()
    let goods = []
    cart().data.data.forEach((element, index) => {
        if (cart().selectdata.includes(element.id)) {
            goods.push(element)
        }
    });
    if (JSON.stringify(oldorder.goods) !== JSON.stringify(goods) || oldorder.path != path().checkid) {
        oldorder.id = order_id
        oldorder.goods = goods
        oldorder.path = path().checkid
        http.post('api/creatorder', {
            order_id,
            goods: goods,
            payway:payway.value,
            path: path().checkid
        }).then(res => {
            console.log(res);
            qrdata.value = res.data.qrCode
            showalert.value = true
            paysuccess = 1
            var timer = setInterval(function () {
                // 在组件卸载前取消定时器
                if (router.currentRoute.value.name !== 'order') {
                    clearInterval(timer);
                    return;
                }
                http.post('api/paystuats', { id: res.data.outTradeNo, goods: goods }).then(res => {
                    console.log(res.data)
                    if (res.data.code == '10000') {
                        paysuccess = 2
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
                                oldorder.goods = [];
                                oldorder.path = '';
                                cart().selectdata = [];
                                router.push('/myorder')

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




        })

    }
}

</script>
<style lang="less" scoped>
.path {
    span {
        margin: 5px 15px;
        font-size: 13px
    }

    .van-address-list {
        padding-bottom: 0px;
    }
}



.paystyle {
    padding: 5px 0;

    div {
        margin: 5px 15px;
        font-size: 13px
    }
}
</style>