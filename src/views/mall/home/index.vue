<template>
  <div class="home">
    <van-tabs v-model="active" swipeable fixed>
      <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
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
  export default class extends Vue {}
</script>