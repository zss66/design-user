<template>
    <!-- 模态框 -->
    <div @click="Modal" :class="{ mask: model }"></div>
    <!-- 弹窗主体 -->
    <div :style="{ height: barHeight + 'px' }" class="active" :class="{ add: model }">
        <div class="title">{{ title }} <span @click="close">x</span></div>
        <div class="cont" :style="{ height: barHeight - 40 + 'px' }">
            <!-- 天 -->
            <div class="day scroll">
                <div style="position: fixed;">
                    <div :class="index === isIndex ? 'active_copy' : ''" v-for="(item, index) in content" :key="item.id"
                        @click="dataCallback(index, item)">{{ item.timezh }}</div>
                </div>
            </div>
            <!-- 时 -->
            <div class="content scroll">
                <div class="appoint" :class="index === Indexes ? 'longActive' : ''" @click="timeCallback(index, item)"
                    v-for="(item, index) in Days" :key="index">{{ item.timestr }}<span
                        :class="index === Indexes ? 'cuIcon-check' : ''"></span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
    props: {
        title: {
            type: String,
            default: "请传入title",
        },
        content: {
            type: Array,
            default: () => [
                {
                    timezh: "今天 (周三)",
                    id: 108,
                    timelist: [
                        { timestr: "立即送达" },
                        { timestr: "15:35" },
                        { timestr: "16:05" }
                    ],
                },
            ],
        },
        barHeight: {
            type: Number,
            default: 400,
        },
        dodge: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['dataCallback', 'timeCallback'],
    setup(props, { emit }) {
        const model = ref(false);
        const scrollTop = ref(0);
        const isIndex = ref(0);
        const Indexes = ref(0);
        const Days = ref([]);

        onMounted(() => {
            Days.value = props.content[0].timelist;
        });

        watch(() => props.content, (newValue) => {
            Days.value = newValue[0].timelist;
        });

        const close = () => {
            model.value = false;
        };

        const open = () => {
            model.value = true;
        };

        const Modal = () => {
            if (props.dodge) {
                close();
            }
        };

        const gotop = () => {
            scrollTop.value = 1;
            setTimeout(() => {
                scrollTop.value = 0;
            }, 0);
        };

        const dataCallback = (index, item) => {
            isIndex.value = index;
            Days.value = props.content[index].timelist;
            Indexes.value = null;
            gotop();
            emit("dataCallback", item);
        };

        const timeCallback = (index, item) => {
            Indexes.value = index;
            emit("timeCallback", item);
        };

        return {
            model,
            scrollTop,
            isIndex,
            Indexes,
            Days,
            close,
            open,
            Modal,
            gotop,
            dataCallback,
            timeCallback
        };
    }
};
</script>


<style scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    animation: getInto 0.5s 1;
    opacity: 0.5;
    z-index: 999;
}

@keyframes getInto {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.5;
    }
}

.active {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 400px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
    transform: translateY(100%);
    transition: 0.4s;
}

.add {
    transform: translateY(0);
}

.title {
    position: relative;
    text-align: center;
    background-color: #fff;
    padding: 5px 0;
    border-bottom: 2px solid #eee;
    color: #646060;
    font-size: 18px;
}

.title>span {
    position: absolute;
    top: 5px;
    right: 14px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: #ccc;
    color: #fff;
    border-radius: 50%;
}

.cont {
    display: flex;
    background-color: #fff;
    overflow-y: scroll;
}

.day {
    flex: 3;
    background-color: #fff;
    border-right: 2px solid #f8f8f8;
    text-align: center;
    /* border-bottom: 20px solid #fff; */
}

.day div {
    padding: 15px 12px;
    font-size: 15px;
    box-sizing: border-box;
}

.content {
    flex: 4;
    font-size: 13px;
    border-bottom: 40px solid #fff;
    background-color: #fff;
}

.appoint {
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #f8f8f8;
}



.active_copy {
    position: relative;
    background-color: #d7f7e3;
    color: #27c866;
    box-sizing: border-box;
}

.active_copy::after {
    content: "";
    width: 5px;
    height: 50px;
    background: #27c866;
    position: absolute;
    top: 0;
    right: 0;
}

.longActive {
    position: relative;
    color: #27c866;
}

.cuIcon-check {
    position: absolute;
    width: 15px;
    left: 150px;
    height: 8px;
    border-bottom: 4px solid #27c866;
    border-left: 4px solid #27c866;
    transform: rotate(-45deg);

}

.scroll ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}
</style>
