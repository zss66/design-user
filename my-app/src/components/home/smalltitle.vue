<template>
    <div class="contain">
        <span>爆款推荐</span>
    </div>
</template>
<style  scoped>
span::before,
span::after {
    content: "\2022";

    color: rgb(231, 224, 39);
    /* 实心圆点 Unicode 编码 */
    margin: 0 0.5em;
}

.contain {

    margin: 5px 0;
    width: 100%;
    text-align: center;
    font-family: '微软雅黑'
}
</style>