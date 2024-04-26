<template>
    <div class="container">
        <van-sticky offset-top="99px" class="left">
            <van-sidebar v-model="sideactive">
                <van-sidebar-item :title="item"
                    v-for="(item, index) in usedata().data.map(item => Object.keys(item)[0])  " :key="item"
                    @click="scrollToTab(index)" />
            </van-sidebar>
        </van-sticky>

        <div style="padding-bottom: 50vh;" class="right">

            <div class="blocks" v-for="(item, index) in usedata().data" :key="index" :id="index">
                <smalltitle :smalltitle="Object.keys(item)[0]" class="title">
                </smalltitle>
                <div class="list" v-for="listitem in item[Object.keys(item)[0]]" :key="listitem.id">
                    <img :src="listitem.img" alt="图片">
                    <div class="list-dec">
                        <b>{{ listitem.name }}</b>
                        <p>{{ listitem.dec }}</p>
                        <div class="dec-footer">
                            <div>
                                <b>{{ listitem.newprice }}</b>
                                <span>¥{{ listitem.price }}</span>
                            </div>

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
import { shop } from '../../pinia/shop';
import { usedata } from '../../pinia/data';
import smalltitle from '../../components/home/smalltitle.vue';
import { ref } from 'vue';
import http from '../../utils/request';
import { onUpdated, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import swal from 'sweetalert';
import { watchEffect } from 'vue';
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
function compareAndUpdateArray(arr, obj) {
    let isin = false
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 如果数组中存在与对象相同的 id
        if (arr[i].id == obj.id) {
            isin = true
            arr[i].num = obj.num
            if (arr[i].num <= 0) {
                console.log(arr[i]);
                arr.splice(i, 1);
            }
            return;
        }
    }
    if (!isin) {
        arr.push(obj)
    }
    // 如果数组中不存在与对象相同的 id，则将对象添加到数组中

}
function sumNumsInArray(arr) {
    let sum = 0;
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 累加每个对象的 num 值
        sum += arr[i].num;
    }
    return sum;
}
function sumNumsByType(arr, type) {
    let sum = 0;
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 如果找到匹配的类型，则累加其 num 值
        if (arr[i].type === type) {
            sum += arr[i].num;
        }
    }
    return sum;
}



const yanzhen = (is) => {
    let i = { ...is }
    //业务提醒，询问顾客是否要选择套餐，如果选择的话，开启限制，如果不选择，不处理，按单价购买
    if ((i.type == 1 || i.type == 2)) {
        let ist = true
        shop().taocan.forEach(it => {
            if (it.id == i.id && i.num < it.num && sumNumsByType(shop().taocan, 1) + sumNumsByType(shop().taocan, 2) == 3) {
                console.log(i.num);
                console.log(it.num);

                console.log(ist);
                ist = false
                compareAndUpdateArray(shop().taocan, i)
            }
        })
        if (ist) {
            if (sumNumsByType(shop().taocan, 1) + sumNumsByType(shop().taocan, 2) > 2) {
                swal({
                    title: "超出套餐数量",
                    text: "超出套餐数量后，再次添加只能按照原价购买！",
                    icon: "info",
                });
                shop().taocan.forEach(item => {
                    if (item.id == i.id) {
                        i.num = i.num - item.num
                    }
                })
                compareAndUpdateArray(shop().choice, i)
            }
            else {
                compareAndUpdateArray(shop().taocan, i)
            }
        }
        if (sumNumsByType(shop().taocan, 1) + sumNumsByType(shop().taocan, 2) < 2) {
            swal({
                title: "套餐菜品提示",
                text: "套餐内餐品不能只购买一份，超出套餐范围按原价收取",
                icon: "info",
            });
        }

        if (sumNumsByType(shop().taocan, 1) == 1 && sumNumsByType(shop().taocan, 2) == 1) {

            console.log('当前为一荤一素套餐，选择的餐品为', shop().taocan);
            shop().taocanprice = 7;
        }
        else if (sumNumsByType(shop().taocan, 1) == 2 && sumNumsByType(shop().taocan, 2) == 0) {


            shop().taocanprice = 0;
        } else if (sumNumsByType(shop().taocan, 1) == 0 && sumNumsByType(shop().taocan, 2) == 2) {


            shop().taocanprice = 0;
        }
        else if (sumNumsByType(shop().taocan, 1) == 2 && sumNumsByType(shop().taocan, 2) == 1) {
            console.log('当前为一荤两素套餐，选择的餐品为', shop().taocan);
            shop().taocanprice = 8;

        }
        else if (sumNumsByType(shop().taocan, 1) == 1 && sumNumsByType(shop().taocan, 2) == 2) {
            shop().taocanprice = 9;
            console.log('当前为两荤一素套餐，选择的餐品为', shop().taocan);
        }

    }
    else {

        compareAndUpdateArray(shop().choice, i)
    }
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
@media (max-width: 600px) {
    .mobile-layout-container {
        width: 90%;
        max-width: 90%;
        padding: 10px;
        font-size: 0.5rem;
    }
}

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

                    b {
                        font-size: 17px;
                        margin-right: 5px;
                        color: #de6119;
                    }

                    span {
                        color: #999;
                        text-decoration: line-through;
                    }
                }

            }
        }
    }
}
</style>