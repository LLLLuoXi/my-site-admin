<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-20 23:26:12
 * @LastEditors: your name
 * @Description: 
-->

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎使用个人博客后台</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
