<template>
  <div class="buttom-menu">
    <van-tabbar route fixed>
      <van-tabbar-item to="/" icon="wap-home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/category" icon="todo-list-o
          ">
        分类
      </van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">
        我的
      </van-tabbar-item>
    </van-tabbar>˝
  </div>
</template>
<script lang="ts">
  import {
    Vue,
  } from 'vue-property-decorator';
  export default class extends Vue {}
</script>