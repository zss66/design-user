<template>
    <headeritem></headeritem>
    <div class="paystyle">
        <div> 就餐时间：</div>
    </div>
    <van-radio-group v-model="ordertime" direction="horizontal" style="font-size: 15px;margin-left: 25px;">
        <van-radio name="1">立即</van-radio>
        <van-radio v-if="usedata().shopoffer.includes('可预约')" name="2">显示预约</van-radio>
        <van-radio v-if="usedata().shopoffer.includes('隐藏预约')" name="3">隐藏预约</van-radio>
    </van-radio-group>
    <delivery-time-op @dataCallback="dataCallback" @timeCallback="timeCallback" :dodge="true" ref='model'
        :content="content" :barHeight='350' title="选择预送达时间">
        > </delivery-time-op>
    <div class="paystyle">
        <div> 就餐方式：</div>
    </div>
    <van-radio-group v-model="checked">
        <van-cell-group inset>
            <van-cell v-if="usedata().shopoffer.includes('可堂食')" title="堂食" clickable @click="checked = '1'">
                <template #right-icon>
                    <van-radio name="1" />
                </template>
            </van-cell>
            <van-cell v-if="usedata().shopoffer.includes('可打包')" title="打包" clickable @click="checked = '2'">
                <template #right-icon>
                    <van-radio name="2" />
                </template>
            </van-cell>
            <van-cell v-if="usedata().shopoffer.includes('可外送')" title="外送" clickable @click="checked = '3'">
                <template #right-icon>
                    <van-radio name="3" />
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
    <div class="path" v-if="checked == '3'">
        <span>地址选择：</span>
        <van-address-list v-if="Object.keys(path().default).length !== 0" v-model="chosenAddressId"
            :show-add-button="false" :list=[path().default] :disabled-list="null" disabled-text=""
            :default-tag-text="null" :switchable="false" @click-item="router.push({ 'name': 'path' })" />
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
    <div style="padding-bottom: 80px;">
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
    </div>

    <van-dialog v-model:show="showalert" title="支付宝扫码支付" :showConfirmButton=false
        style="display: flex; justify-content: center;flex-direction: column;align-items: center;"
        close-on-click-overlay>
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
import deliveryTimeOp from '../timeselect/index.vue'
import { provide, watchEffect } from 'vue';
import { ref } from 'vue';
import http from '../../utils/request';
import { cart } from '../../pinia/cartinfo';
import Qrcode from 'vue-qrcode';
import { path } from '../../pinia/path';
import router from '../../router';
import { showToast } from 'vant';
import { usedata } from '../../pinia/data';
provide('title', '提交订单')
const chosenAddressId = ref('1');
const payway = ref('1')
const showalert = ref(false)
const qrdata = ref('');
const checked = ref('1');
const ordertime = ref('1');
const model = ref(null)

watchEffect(() => {
    console.log(ordertime.value > 1);
    if (ordertime.value > 1) {
        model.value.open()
        console.log(choicday.value, choictime.value);
    }

})

const timeCallback = (time) => {
    console.log(time);
    choictime.value = time.timestr
}
const dataCallback = (time) => {
    console.log(time);
    choicday.value = time.timezh
}
console.log(ordertime.value);
let paysuccess = 0
let oldorder = {
    id: '',
    goods: [],
    path: ''
}

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();
const currentDay = now.getDay(); // 0 表示周日，1 表示周一，以此类推
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
let choicday = ref(generateDynamicTimeZh(0))
let choictime = ref(currentHour + ':' + currentMinute)
// 生成数据
const content = [
    {
        "timezh": generateDynamicTimeZh(0),
        "id": 1,
        "timelist": generateDynamicTimeList(currentHour, currentMinute)
    },
    {
        "timezh": generateDynamicTimeZh(1),
        "id": 2,
        "timelist": generateStaticTimeList()
    },
    {
        "timezh": generateDynamicTimeZh(2),
        "id": 3,
        "timelist": generateStaticTimeList()
    }
];

// 动态生成时间列表（当天）
function generateDynamicTimeList(startHour, startMinute) {
    const timeList = [];

    // 如果当前时间已经过了今天最早的时间，将立即送达加入列表
    if (startHour > 8 || (startHour === 8 && startMinute >= 45)) {
        timeList.push({ "timestr": "立即送达" });
    }

    // 从当前时间开始，每隔一个小时生成一个时间段，直到晚上8点
    let hour = startHour + 1; // 从下一个小时开始
    while (hour < 20) {
        const timeString = `${padZero(hour)}:00-${padZero(hour + 1)}:00`;
        timeList.push({ "timestr": timeString });
        hour++;
    }

    return timeList;
}

// 动态生成时间描述（明天和后天）
function generateDynamicTimeZh(offset) {
    const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const targetDate = new Date(now.getTime() + (offset * 24 * 60 * 60 * 1000));
    const targetDay = daysOfWeek[targetDate.getDay()];
    const targetMonth = targetDate.getMonth() + 1;
    const targetDateNum = targetDate.getDate();
    return `${targetMonth}月${targetDateNum}日 (${targetDay})`;
}

// 静态生成时间列表（后续两天）
function generateStaticTimeList() {
    const timeList = [];

    // 从早上9点开始，每隔一个小时生成一个时间段，直到晚上8点
    let hour = 9;
    while (hour < 20) {
        const timeString = `${padZero(hour)}:00-${padZero(hour + 1)}:00`;
        timeList.push({ "timestr": timeString });
        hour++;
    }

    return timeList;
}

// 补零函数，用于确保数字两位数格式
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}

const pathchange = () => {
    switch (payway.value) {
        case '1':
            return '-1';
            break;
        case '2':
            return '-2';
            break;
        case '3':
            return path().checkid;
            break;
        default:
            return '-1';
    }
}
const order_time = () => {
    switch (ordertime.value) {
        case '1':
            return {
                type: '立即送达',
                time: new Date()
            };

        case '2':
            return {
                type: '显示预约',
                time: choicday.value + '-' + choictime.value
            };
        case '3':
            return {
                type: '隐藏预约',
                time: choicday.value + '-' + choictime.value
            };
            break;
        default:
            return '-1';

    }
}
const creatorder = () => {
    if (payway.value == 1) {
        showToast('测试环境无法接入微信支付')
    }
    else {
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
                payway: payway.value,
                ordertime: ordertime.value,
                checked: checked.value,
                order_time: order_time(),
                path: pathchange()
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