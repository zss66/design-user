<template>
    <div>
        <!-- 固定头部文件 -->

        <!-- 设置flex属性 -->
        <van-sticky>
            <div :style="{ opacity: 1 - op1 * 2 }" v-if="op1 < 0.4">
                <van-nav-bar @click-left="router.go(-1)" @click-right="router.push('/')">
                    <template #left>
                        <van-icon name="arrow-left" size="20" class="icon1" />
                    </template>
                    <template #title>
                        店铺详情
                    </template>
                    <template #right>
                        <van-icon name="wap-home-o" size="20" class="icon1" />
                    </template>
                </van-nav-bar>

            </div>
            <div :style="{ opacity: op1 }" v-else>
                <van-nav-bar @click-left="router.go(-1)" @click-right="router.push('/')">
                    <template #left>
                        <van-icon name="arrow-left" size="20" class="icon2" />
                    </template>
                    <template #title class="title">
                        <van-tabs line-width="60px" sticky>
                            <van-tab title="商品详情" class="nav"></van-tab>

                        </van-tabs>
                    </template>
                    <template #right>
                        <van-icon name="wap-home-o" size="20" class="icon2" />
                    </template>
                </van-nav-bar>
            </div>
        </van-sticky>

        <div>
            <div class="photo">
                <!-- 预留swipe板块 -->
                <!-- <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in shop().data[0].imgUrl" :key="image" style="margin-top: 50px;">
                </van-swipe-item>
            </van-swipe> -->
                <!-- <img :src="shopinfo.data.data[0].imgUrl" style="width: 95vw;margin: 0 auto;" /> -->
                <img :src="usedata().shopselect.swiperurl" style="width: 100vw; height: 200px; margin: 0 auto;" />

            </div>

            <div
                style="margin-top: -50px;position: relative;  background: #fff;z-index: 1;padding-top: 20px;border-radius: 20px;">
                <div class="containlike">
                    <img :src="usedata().shopselect.showurl" alt="png">
                    <div class="miaoshu">
                        <van-text-ellipsis content='食堂点餐页面' style="font-weight:bolder;margin-bottom: 5px;" />
                        <div class="shopdata">
                            <div class="sore"><span>{{ usedata().shopselect.goal }}</span>分</div>
                            <div class="buynum">月售{{ usedata().shopselect.num }}</div>
                        </div>
                        <div class="eatstyle">
                            <span v-for="i in usedata().shopselect.offer.split(',')">{{ i }}</span>

                        </div>
                        <div class="shopact">
                            <span>{{ usedata().shopselect.shopdec }}</span>
                        </div>
                    </div>
                </div>
                <van-sticky offset-top="49px">
                    <van-tabs v-model:active="swiactive">
                        <van-tab title="点餐">
                        </van-tab>
                        <van-tab title="评价"></van-tab>
                        <van-tab title="商家"></van-tab>
                    </van-tabs>
                </van-sticky>
                <sideswiper v-show="swiactive == 0"></sideswiper>
                <div class="score" v-show="swiactive == 1">
                    <div>
                        <div class="scorenum">
                            <div>
                                5.00
                            </div>
                            <span>商品服务</span>
                        </div>
                        <div>
                            <div style="display: flex;">
                                <img src="../../assets/images/goods1.jpg" alt="头像"
                                    style="width: 50px;height: 50px;border-radius: 50%;">
                                <div style=" width: 100%;">
                                    <div style="display: flex; justify-content:space-between;">
                                        <div>
                                            <span style="font-size: 15px;font-weight: 700;">微信用户 </span>
                                            <van-rate v-model="rate" :size="12" color="#ffd21e" void-icon="star"
                                                void-color="#eee" />
                                            <div style="font-size: 12px; color: #999;">1件商品</div>
                                        </div>
                                        <span style="font-size: 12px; color: #999;margin-top: 10px;">
                                            2024-03-16 21:13:06
                                        </span>
                                    </div>
                                    <div
                                        style="font-size: 12px; padding: 5px;background-color: #eee;border-radius: 5px;">
                                        <span style="color: orangered;">商家回复：</span>
                                        <span style="color: #999;">感谢支持。</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <van-divider style="margin: 20px 0;">没有更多了</van-divider>
                    </div>


                </div>
                <div style="padding: 15px;" v-show="swiactive == 2">
                    <div class="bossinfo">
                        商家信息
                    </div>
                    <div class="bossdetail">
                        <div class="bosstime">
                            营业时间： {{ usedata().shopselect.opentime }}
                        </div>
                        <div class="bossadress"> 地址: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ usedata().shopselect.address }}
                        </div>
                        <div class="bossphone">联系电话： {{ usedata().shopselect.phone }}</div>
                    </div>
                </div>

            </div>


        </div>

        <!-- 购买消息确认框 -->
        <van-action-sheet v-model:show="show" :title="shopinfo.data.data[0].name">
            <div style="display: flex;padding: 0 20px">
                <img :src="shopinfo.data.data[0].imgUrl" alt="商品图片" style="width: 78px;height: 78px;">
                <div style="font-size: 20px;padding-left: 15px;">
                    <p style="margin-bottom: 10px;">{{ shopinfo.data.data[0].price }}￥</p>
                    <p>库存 100件</p>

                </div>
            </div>
            <van-stepper v-model="value" theme="round" button-size="22" disable-input
                style="position: fixed;right: 20px;" />
            <div class="content"></div>
            <van-button type="danger" style="position: sticky;width: 100%;" @click="console.log(value)">确认</van-button>
        </van-action-sheet>
        <!-- 底部信息 -->
        <van-sticky position="bottom"
            style="position: fixed;bottom: 0;width: 100vw; z-index: 2; background-color: #fff;">
            <div style="display: flex;justify-content: space-between; margin-left: 15px;">
                <div class="footicon">
                    <van-icon name="service-o" />
                    <span>客服</span>
                </div>
                <div class="footicon">
                    <van-icon name="cart-o" />
                    <span>购物车</span>
                </div>
                <div class="footicon">
                    <van-icon name="star-o" />
                    <span>收藏</span>
                </div>
                <div>
                    <van-button type="warning" @click="addcart"
                        style="padding: 0 15px;border-radius: 0;">加入购物车</van-button>
                    <van-button type="danger" @click="buynow"
                        style="padding: 0 15px;border-radius: 0;">立即购买</van-button>
                </div>

            </div>
        </van-sticky>
    </div>


</template>
<script setup>
import sideswiper from '../sideswiper/index.vue'
import { showToast } from 'vant';
import router from '../../router';
import { ref } from 'vue';
import http from '../../utils/request';
import { shop } from '../../pinia/shop';
import { userInfo } from '../../pinia/userinfo';
import { usedata } from '../../pinia/data';
import { onMounted } from 'vue';
import Swal from 'sweetalert2'
Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
})
const show = ref(false);
const rate = 5
const tabactive = ref(0)
const swiactive = ref(0)
let shopinfo = shop()
// 此数据为
const active = ref(0)
//设置头部文件根据商品信息的高度而透明度渐变过程
const op1 = ref(0)
onMounted(() => {
    const photo = document.querySelector('.photo')
    const high = photo.clientHeight
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        op1.value = currentScrollTop / high
        op1.value > 1 ? op1.value = 1 : op1.value
    })
})
//监听

//加入购物车操作
const addcart = () => {
    if (userInfo().loginstatus) {
        // http.get()
        showToast('加入购物车成功！')
        console.log("已经完成加入操作");
        http.post('api/addcart', {
            data: {
                id: shopinfo.data.data[0].id,
            }
        },).then(res => console.log(res.data.data.msg))
    }
    else {
        showToast('请先登录，再加入购物车！');
        console.log('未登录');
        setTimeout(() => {
            router.push('/login');
        }, 1000);
        clearTimeout
    }
}
//立即购买操作
const buynow = () => {
    show.value = true
}
</script>
<style lang="less" scoped>
* {

    padding: 0;
    margin: 0;
}

.containlike {
    background-color: #fff;
    display: flex;
    margin: 5px;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;

    .miaoshu {
        width: 100%;

        .shopdata {
            color: #666;
            display: flex;
            font-size: 12px;

            .sore {
                line-height: 15px;
                margin-right: 10px;
                color: rgb(239, 86, 10);

                span {
                    font-weight: 700;
                    font-size: 15px;
                }
            }

        }

        .eatstyle {
            color: #1f1f1f;
            margin: 5px 0;
            font-size: 12px;

            span {
                background-color: #97d4bf;
                padding: 2px;
                border-radius: 2px;
                margin-right: 3px;
            }
        }

        .shopact {
            font-size: 12px;
            margin-top: 10px;

            span {
                padding: 2px;
                border-radius: 2px;
                background-color: #e8c9af;
                margin-right: 3px;

            }
        }
    }

    img {
        padding: 0 10px;
        width: 100px;
        border-radius: 10%;
    }

}

.content {
    padding: 16px 16px 160px;
}

.header {
    z-index: 2;

    .icon1 {
        padding: 8px;
        background-color: rgba(155, 155, 155, 0.3);
        border-radius: 50%;
    }

    .icon2 {
        padding: 8px;
    }

    .title {}
}

.now::before {
    content: '￥';
    display: inline-block;
    font-size: .42rem;
    text-indent: 0rem;
}

.o-t-price {
    padding-top: 20px;

    .now {


        line-height: 1;
        color: #D22531;
        font-size: 0.75rem;
    }

    .o-t-spec {
        margin-left: 0.32rem;
        color: #949494;
        word-spacing: 5px;
        font-size: 0.4rem;
    }
}

.original-price {
    color: #999;

    span,
    del {
        font-size: 12px;
    }
}

.bossinfo {
    font-size: 12px;
    margin: 10px 0;
    color: #949494;
}

.bossdetail {
    font-size: 12px;
    color: #333;

    div {
        margin: 20px 0;
    }
}

.score {
    padding: 15px;

    .scorenum {
        display: flex;
        flex-direction: column;
        max-width: max-content;
        align-items: center;

        div {
            font-size: 15px;
        }

        span {
            font-size: 12px;
            color: #949494;
        }
    }
}

.footicon {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    align-items: center;
}
</style>