<template>
    <headervue></headervue>
    <div class="container">
        <van-sticky class="left">
            <van-sidebar v-model="active">
                <van-sidebar-item :title="item.name" v-for="item in items" :key="item.id" @click="scrollToTab(item.id)" />
            </van-sidebar>
        </van-sticky>
        <div style="padding-bottom: 50vh;" class="right">

            <div class="blocks" v-for="item in items" :key="item.id" :id="item.id">
                <smalltitle :smalltitle="item.name" class="title">
                </smalltitle>
                <div class="lists">
                    <div class="list" v-for="listitem in item.data[0].list">
                        <img :src="listitem.imgUrl" alt="图片">
                        <span>{{ listitem.name }}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <van-sticky>
        <Footer></Footer>
    </van-sticky>
</template>
<script setup >
import headervue from '../components/home/header.vue'
import Footer from '../components/footer.vue';
import { usedata } from '../pinia/data';
import smalltitle from '../components/home/smalltitle.vue';
import { ref } from 'vue';
import http from '../utils/request';
import { onUpdated, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
const items = ref('')
http.get('item').then(res => {
    console.log(res.data.data[0].data[0].list);
    console.log(res.data.data);
    items.value = res.data.data;

})
const active = ref(0);
const high = [0];
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
        item.scrollIntoView({
            behavior: 'auto',
            block: 'start'
        });
    }
};
</script>
<style lang="less" scoped>
.container {
    display: flex;

    .left {
        flex: 2.2;
        z-index: 0 !important;
    }

    .right {
        flex: 7.8
    }

    .blocks {
        margin-bottom: 20px;

        .title {
            margin-bottom: 20px;
        }

        .lists {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
            grid-gap: 10px;
        }

        .list {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            span {
                font-size: 10px;
                text-align: center;
            }
        }
    }
}

.van-sticky {
    height: 90vh;
}

.footer {
    z-index: 100;
}
</style>