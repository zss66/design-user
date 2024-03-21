<template>
    <div class="container">
        <van-sticky offset-top="99px" class="left">
            <van-sidebar v-model="sideactive">
                <van-sidebar-item :title="item.name" v-for="item in items" :key="item.id"
                    @click="scrollToTab(item.id)" />
            </van-sidebar>
        </van-sticky>
        <div style="padding-bottom: 50vh;" class="right">

            <div class="blocks" v-for="item in items" :key="item.id" :id="item.id">
                <smalltitle :smalltitle="item.name" class="title">
                </smalltitle>
                <div class="list" v-for="listitem in item.data[0].list">
                    <img :src="listitem.imgUrl" alt="图片">
                    <div class="list-dec">
                        <b>{{ listitem.name }}</b>
                        <p>增色添味，香气浓郁</p>

                        <div class="dec-footer">
                            <span>￥3.98</span>

                            <van-stepper v-if="numvalue[index] > 0" v-model="numvalue[index]" theme="round" min="0"
                                button-size="15" disable-input />
                            <button v-else @click="numvalue[index] = 1" type="button"
                                style="width: 15px; height: 15px; text-align: center; padding: 0; line-height: 15px; color: #fff; background-color: #1989fa; border-radius: 50%; font-weight: 200;">+</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script setup>
import { usedata } from '../../pinia/data';
import smalltitle from '../../components/home/smalltitle.vue';
import { ref } from 'vue';
import http from '../../utils/request';
import { onUpdated, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
const items = ref('')
const numvalue = ref([0])
http.get('api/item').then(res => {
    console.log(res.data.data[0].data[0].list);
    console.log(res.data.data);
    items.value = res.data.data;
})
const sideactive = ref(0);
const high = [99];
const handlelisten = function () {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    high.forEach((item, index) => {
        if (currentScrollTop >= item && currentScrollTop < high[index + 1]) {
            active.value = index
            console.log(active.value);
        }
    })
}
onBeforeRouteLeave((to, from, next) => {
    window.removeEventListener('scroll', handlelisten);

    next();
})

onUpdated(() => {
    window.addEventListener('scroll', handlelisten);
    let height = 0
    var elements = document.getElementsByClassName("blocks");
    if (high.length == 1) {
        [...elements].forEach((item) => {
            height = height + item.clientHeight
            high.push(height)
        })
        console.log([...elements]);
        console.log(high);
    }
});

//点击tab标签，滑动到对应位置
const scrollToTab = (id) => {
    const item = document.getElementById(id);
    console.log(id);
    // observer.observe(item)

    if (item) {
        const topPos = item.getBoundingClientRect().top + window.pageYOffset - 99;
        window.scrollTo({
            top: topPos,
            behavior: 'auto'
        });
    }

};
</script>
<style lang="less" scoped>
.container {
    display: flex;

    .right {
        flex: 1;
    }

    .blocks {
        margin-bottom: 20px;

        .title {
            margin-bottom: 20px;
        }


        .list {
            display: flex;
            margin-bottom: 10px;

            /* 边框样式：2像素宽度的黑色边框 */
            box-shadow: 5px 5px 5px rgba(189, 188, 188, 0.2);

            /* 阴影样式：水平偏移5像素，垂直偏移5像素，模糊半径5像素，颜色为半透明的黑色 */
            img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }

            .list-dec {
                margin: 0 10px;
                display: flex;

                width: 100%;
                flex-direction: column;
                justify-content: space-between;

                b {
                    font-size: 12px;
                }

                p {
                    margin: 0;
                    padding-bottom: 20px;
                    font-size: 10px;
                    color: #888;
                }

                .dec-footer {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    margin-bottom: 5px;

                    span {
                        color: #de5718;
                    }
                }

            }
        }
    }
}
</style>