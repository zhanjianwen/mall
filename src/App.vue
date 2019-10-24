<template>
  <div id="app" style="font-size: 16px;">
    <router-view />
  </div>
</template>
<style lang="stylus">
  #app {
    font-family: 'Helvetica Neue', 'Tahoma', 'Arial', 'PingFangSC-Regular', 'Hiragino Sans GB', 'Microsoft Yahei', 'sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
  }

  #nprogress .bar {
    background: red !important;
  }

  .geetest_goto_wrap {
    display: none;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    background-color: #f0f0f0;
  }

  .page-content {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .header-menu {
    height: 50px;
  }

  .buttom-menu~.page-content {
    bottom: 50px;
  }

  .header-menu~.page-content {
    top: 50px;
  }

  .buttom-menu {
    position: absolute;
    top: 100%;
    margin-top: -50px;
    width: 100%;
    height: 50px;
  }

  .divider_line {
    margin: 0 auto;
    border-top: none;
    border-left: none;
    border-right: none;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }
  .ellipsis{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Icon,
  } from 'vant';
  @Component({
    components: {
      [Icon.name]: Icon,
    },
  })
  export default class extends Vue {}
</script>