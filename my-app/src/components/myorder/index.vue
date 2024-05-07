<!--
 * @Author: zss zjb520zll@gmail.com
 * @Date: 2024-03-21 15:10:24
 * @LastEditors: zss zjb520zll@gmail.com
 * @LastEditTime: 2024-04-30 17:56:44
 * @FilePath: /desktop-tutorial/my-app/src/components/myorder/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <headeritem></headeritem>
    <van-tabs v-model:active="order().active" swipeable>
        <van-tab v-for="(items, index) in order().ordertab" :title="items" :key="index"
            style="background-color: antiquewhite;">
            <!-- 遍历分组后的订单列表 -->
            <div v-for="(group, orderId) in groupedOrders(order().orderlist[index])" :key="orderId"
                style="margin: 20px 5px; border-radius: 20px; background-color: #fff;">
                <!-- 显示订单信息 -->
                <div v-for="item in group" :key="item.order_id">
                    <!-- 这里放你的 van-card 组件 -->
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
                            <div v-if="item.order_status < 6 && item.order_status > 2" >
                                <van-button @click="okpay(item.order_id)" size="mini">确认收货</van-button>
                                <van-button v-if="item.order_code" size="mini">取餐码：{{ item.order_code }}</van-button>
                            </div>
                            <div v-if="item.order_status >= 6&&item.orderpj!=1"
                                @click="order().getshoperinfo(item.shopid); order_id= item.order_id; showCenter = true ;goodsdec=item.goods_name">
                                <van-button size="mini">去评价</van-button>
                            </div>

                        </template>
                    </van-card>

                </div>

            </div>
        </van-tab>
    </van-tabs>
    <van-popup v-model:show="showCenter" id="showpopup" round :style="{ padding: '20px' }">
        <div>
            <div style="display: flex; justify-content: center;">商品评价弹窗</div>
            <div class="shopinfo" style="display: flex;margin: 10px 0;">
                <div class="shopimg">
                    <img :src="order().shoperinfo.showurl" alt="头像" style="width: 50px;border-radius: 50%;">
                </div>
                <div class="shopname" style="margin-left: 15px;">
                    <div style="font-size: 18px;">
                        {{ order().shoperinfo.title }}
                    </div>
                    <div style="font-size: 15px; color: #999;">
                        {{ order().shoperinfo.shopdec }}
                    </div>
                </div>
            </div>
            <div class="score" style="display: flex; font-size: 15px;margin-left: 15px;">
                <div class="goods">商品评分：</div>
                <van-rate v-model="score_value" />
            </div>
            <van-cell-group inset style="margin: 0;">
                <van-field v-model="message" rows="5" autosize label="评价:" type="textarea" maxlength="50" style=""
                    label-width="35" placeholder="请留下你的就餐心得❤️" show-word-limit />
            </van-cell-group>
            <div style="width: 100%; display: flex;">
                <van-button style="flex: 1; " plain type="primary" @click="showCenter=false">取消</van-button>
                <div style="flex: 0.5;"></div>
                <van-button style="flex: 1;" plain type="success" @click="pjup()">提交</van-button>
            </div>
        </div>
    </van-popup>
    <van-dialog v-model:show="showalert" title="支付宝扫码支付" :showConfirmButton=false
        style="display: flex; justify-content: center;flex-direction: column;align-items: center;"
        close-on-click-overlay>
        <qrcode :value=qrdata color: :size="200" style="margin-bottom: 30px;" type="image/png" color="#fff"></qrcode>
    </van-dialog>
</template>
<script setup>
import Qrcode from 'vue-qrcode';
import { showToast } from 'vant';
import headeritem from '../header-bar/index.vue'
import { order } from '../../pinia/order'
import { provide } from 'vue';
import { cart } from '../../pinia/cartinfo';
import { ref } from 'vue';
import { userInfo } from '../../pinia/userinfo';
import router from '../../router';
import http from '../../utils/request';
provide('title', '订单管理')
order().getdata()
const showalert = ref(false)
const qrdata = ref('');
const showCenter = ref(false)
const score_value = ref(NaN)
const message = ref('')
const goodsdec=ref('')
const order_id=ref(0)
const okpay = (id) => {
    http.post('api/okpay', { id: id }).then(res => {
        showToast('收货成功，前往评价')
        location.reload();
        order().active=3

    })
}
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}
// 提交评价信息
const pjup = () => {
    if(score_value.value&&message.value.length!=0){
        http.post('api/goodspj', { role:1,orderid:order_id.value,shopid: order().shopid, score: score_value.value, message: message.value,username:userInfo().nickname,userimg:userInfo().imgUrl,goodsdec:goodsdec.value,times:getCurrentDateTime() }).then(res => {
            
            showToast(res.data.message)
            showCenter.value=false
    })
    }
    else{
       showToast('评价信息填写不完整')
    }
   
}

const groupedOrders = (items) => {
    const grouped = {};
    // 遍历订单列表
    items.forEach(item => {
        // 如果分组中已经有该订单 ID，则将订单添加到分组中，否则创建一个新的分组
        if (grouped[item.order_id]) {
            grouped[item.order_id].push(item);
        } else {
            grouped[item.order_id] = [item];
        }
    });
    return grouped;
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
<style lang="less" scoped>
#showpopup {
    background-color: #fff;
}
</style>