<template>
    <div class="container">
        <van-sticky offset-top="99px" class="left">
            <van-sidebar v-model="sideactive">
                <van-sidebar-item :title="item" v-for="(item, index) in items.map(item => Object.keys(item)[0])  "
                    :key="item" @click="scrollToTab(index)" />
            </van-sidebar>
        </van-sticky>

        <div style="padding-bottom: 50vh;" class="right">

            <div class="blocks" v-for="(item, index) in items" :key="index" :id="index">
                <smalltitle :smalltitle="Object.keys(item)[0]" class="title">
                </smalltitle>
                <div class="list" v-for="listitem in item[Object.keys(item)[0]]" :key="listitem.id">
                    <img :src="listitem.img" alt="图片">
                    <div class="list-dec">
                        <b>{{ listitem.name }}</b>
                        <p>{{ listitem.dec }}</p>
                        <div class="dec-footer">
                            <span>{{ listitem.price }}</span>
                            <van-stepper @change='yanzhen(listitem)' :show-minus="listitem.num != 0"
                                :show-input="listitem.num != 0" v-model="listitem.num" theme="round" min="0"
                                button-size="15" disable-input />

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
const items = ref([])
http.get('api/getclass', {
    params: {
        shopid: 1
    }
}).then(res => {
    items.value = res.data.data;
})
const sideactive = ref(0);
const high = [99];
const handlelisten = function () {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    high.forEach((item, index) => {
        if (currentScrollTop >= item && currentScrollTop < high[index + 1]) {
            sideactive.value = index

        }
    })
}
let remind = true
const yanzhen = (i) => {
    //业务提醒，询问顾客是否要选择套餐，如果选择的话，开启限制，如果不选择，不处理，按单价购买
    if ((i.type == 1 || i.type == 2) && remind) {
        console.log(i);
        remind = false
    }
    //     if (type === 'a' && productId === 1) {
    //     logCombination('a=1, b=1');
    //   } else if (type === 'a' && productId === 2) {
    //     logCombination('a=1, b=2');
    //   } else if (type === 'b' && productId === 1) {
    //     logCombination('a=2, b=1');
    //   }
}
onBeforeRouteLeave((to, from, next) => {
    window.removeEventListener('scroll', handlelisten);
    next();
})

onUpdated(() => {
    window.addEventListener('scroll', handlelisten);
    let height = 99
    var elements = document.getElementsByClassName("blocks");
    if (high.length == 1) {
        [...elements].forEach((item) => {
            height = height + item.clientHeight
            high.push(height)
        })
    }
});

//点击tab标签，滑动到对应位置
const scrollToTab = (id) => {
    const item = document.getElementById(id);

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