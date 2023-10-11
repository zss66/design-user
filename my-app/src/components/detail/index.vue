<template>
    <!-- 固定头部文件 -->

    <!-- 设置flex属性 -->
    <div style="width: 100vw;position: fixed; " class="header">
        <!-- 不同时刻显示的内容 -->
        <div :style="{ opacity: 1 - op1 * 2 }" v-if="op1 < 0.4">
            <van-nav-bar>
                <template #left>
                    <van-icon name="arrow-left" size="20" class="icon1" />
                </template>
                <template #right>
                    <van-icon name="wap-home-o" size="20" class="icon1" />
                </template>
            </van-nav-bar>

        </div>
        <div :style="{ opacity: op1 }" v-else>
            <van-nav-bar>
                <template #left>
                    <van-icon name="arrow-left" size="20" class="icon2" />
                </template>
                <template #title class="title">
                    <van-tabs v-model:active="active" line-width="60px" sticky>
                        <van-tab title="商品详情" class="nav"></van-tab>
                        <van-tab title="商品评价" class="nav"></van-tab>
                    </van-tabs>
                </template>
                <template #right>
                    <van-icon name="wap-home-o" size="20" class="icon2" />
                </template>
            </van-nav-bar>
        </div>
    </div>



    <div style="margin: 0 10px;">

        <div class="photo">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image" style="margin-top: 50px;">
                    <img :src="image" style="width: 95vw;margin: 0 auto;" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <h1 style="font-size: 0.5rem;">浙江花果香碧螺春2号</h1>
        <p style="    font-size: 14px;
    color: #999;
    padding-top: 0.2rem;
   ">口感鲜爽甘醇 韵味悠长 花果香浓郁.</p>

        <p class="o-t-price">
            <span class="now">88</span>
            <span class="o-t-spec">/ 150g</span>
        </p>
        <div class="original-price"><span>价格:</span><del>¥168</del></div>

    </div>
    <van-sticky position="bottom" style="position: fixed;bottom: 0;width: 100vw;">
        <div style="display: flex;justify-content: space-between; margin-left: 15px;">
            <div class="footicon">
                <van-icon name="service-o" />
                <span>客服</span>
            </div>
            <div class="footicon">
                <van-icon name="service-o" />
                <span>客服</span>
            </div>
            <div class="footicon">
                <van-icon name="service-o" />
                <span>客服</span>
            </div>
            <div>
                <van-button type="warning" style="padding: 0 15px;">加入购物车</van-button>
                <van-button type="danger" style="padding: 0 15px;">立即购买
                </van-button>
            </div>

        </div>
    </van-sticky>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const header = document.querySelector('.header')
const onClickLeft = () => {
    console.log('hahha');
}
const active = ref(0)
const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];
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
    console.log(high);
})

</script>
<style lang="less" scoped>
* {

    padding: 0;
    margin: 0;
}


.header {
    .icon1 {
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.3);
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

.footicon {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    align-items: center;
}
</style>