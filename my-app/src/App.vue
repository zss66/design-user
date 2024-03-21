<script setup>

</script>
<template>
  <div id="main">

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<style  scoped lang="less">
#main {
  height: 100vh;
}
</style>
