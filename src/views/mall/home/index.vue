<template>
  <div class="page">
    <!-- <div class="header-menu">
    </div> -->
    <div class="buttom-menu">

    </div>
    <div class="page-content">
      <div class="home">
        <van-tabs v-model="activeName" swipeable animated sticky ellipsis>
          <van-tab title="推荐" name="推荐">推荐</van-tab>
          <van-tab title="手机" name="手机">手机</van-tab>
          <van-tab title="智能" name="智能">智能</van-tab>
          <van-tab title="电视" name="电视">电视</van-tab>
          <van-tab title="笔记本" name="笔记本">笔记本</van-tab>
          <van-tab title="家电" name="家电">家电</van-tab>
        </van-tabs>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Tabs,
    Tab,
  } from 'vant';
  @Component({
    name: 'home',
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
    },
  })
  export default class extends Vue {
    private activeName = '推荐';
  }
</script>