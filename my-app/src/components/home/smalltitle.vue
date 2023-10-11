<template>
    <div class="contain">
        <span>{{ smalltitle }}</span>

    </div>
</template>
<script setup>
const props = defineProps(['smalltitle'])
</script>
<style  scoped>
span::before,
span::after {
    content: "\2022";

    color: rgb(231, 224, 39);
    /* 实心圆点 Unicode 编码 */
    margin: 0 0.5em;
}

.contain {
    font-size: 20px;
    margin: 5px 0;
    width: 100%;
    font-weight: 700;
    text-align: center;
    font-family: '微软雅黑'
}
</style>