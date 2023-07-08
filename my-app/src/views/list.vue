<template>
    <headervue></headervue>
    <div class="container">
        <van-sticky>
            <van-sidebar v-model="active">
                <van-sidebar-item :title="item.name" v-for="item in active1" :key="item.id" @click="scrollToTab(item.id)" />
            </van-sidebar>
        </van-sticky>
        <van-button @click="bt">ac</van-button>
        <div style="margin-left: 100px;">
            <div class="block" v-for="item in active1" :key="item.id" :id="item.id">
                hahha
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
import { ref, onMounted, watch } from 'vue';
const active1 = ref([
    {
        id: 1,
        name: 'item1'
    },
    {
        id: 2,
        name: 'item2'
    },
    {
        id: 3,
        name: 'item3'
    },
    {
        id: 4,
        name: 'item4'
    },
    {
        id: 5,
        name: 'item5'
    },
    {
        id: 6,
        name: 'item6'
    },
]);
const active = ref(0);
const high = [0];
// 监听元素是否在屏幕中消失
// const isVisible = ref(false);
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (!entry.isIntersecting) {
//             // 元素离开视窗
//             const target = entry.target;
//             // 进行其他操作，比如打印消失元素的信息
//             console.log('消失元素:', target);
//         }
//     });
// });
// let lastScrollTop = 0;
// //
// var position = 0
window.addEventListener('scroll', function () {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    high.forEach((item, index) => {
        if (currentScrollTop >= item && currentScrollTop < high[index + 1]) {
            active.value = index
        }
    })
});
// if (active.value < 0) {
//     active.value = 0
// } else if (active.value > 6) {
//     active.value = 6
// }
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry, index) => {
//         if (!entry.isIntersecting) {
//             // 元素离开视窗
//             if (position == 0) {
//                 ++active.value
//             }
//             else {
//                 --active.value
//             }
//             const target = entry.target;
//             // 进行其他操作，比如打印消失元素的信息
//             console.log('消失元素:', target, index);
//             // usedata().list_act = index;
//         }
//     });
// });
// const bt = () => {

// }
// watch(active, (newl) => {
//     const element = document.getElementById(newl + 1)
//     // 执行对每个元素的操作 
//     observer.observe(element)
//     console.log(active.value);
//     console.log(newl);
// })
onMounted(() => {
    // const element = document.getElementById(usedata().list_act + 1)
    // // 执行对每个元素的操作 
    // observer.observe(element)
    let height = 0
    var elements = document.getElementsByClassName("block");
    [...elements].forEach((item) => {
        height = height + item.clientHeight
        high.push(height)
    })
    console.log([...elements]);
    console.log(high);

})


// var height = element.clientHeight;
// console.log(height);

//点击tab标签，滑动到对应位置
const scrollToTab = (id) => {
    const item = document.getElementById(id);
    console.log(item.clientHeight);
    // observer.observe(item)
    if (item) {
        item.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};
</script>
<style lang="less" scoped>
.container {
    display: flex;



    .block {
        height: 50vh;
        background-color: aquamarine;
        margin-bottom: 20px;
    }


}

.van-sidebar {
    height: 90vh;
    border-right: 1px solid red;
}
</style>