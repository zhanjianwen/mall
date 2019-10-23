<template>
  <div class="page home">
    <div class="header-menu">
      <div class="header-search">
        <img src="../../../../static/images/smartisan_4ada7fecea.png" />
        <van-search style="width: 275px;" placeholder="搜索商品名称" readonly @click="handelSearch" />
        <div class="header-user" @click="handelUser">
          <van-icon name="user-o" size="24" />
        </div>
      </div>
    </div>
    <buttom-menu></buttom-menu>
    <div class="page-content">
      <van-tabs v-model="activeName" :offset-top="50" swipeable animated sticky ellipsis>
        <van-tab title="推荐" name="推荐">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <van-image :height="180" :src="image" />
            </van-swipe-item>
          </van-swipe>
          <van-grid style="padding: 0;" :column-num="5" :border="false">
            <van-grid-item v-for="gridImage in gridImages" :key="gridImage">
              <van-image :width="75" :src="gridImage" />
            </van-grid-item>
          </van-grid>
          <div class="divider_line"
            style="height:8px; border-bottom: 8px solid rgb(245, 245, 245); background-color: rgb(245, 245, 245);">
          </div>
          <div class="cells-auto-fill">
            <a>
              <van-image width="186"
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/32b5d24417b673008f386592c4d17046.jpg?thumb=1&w=358&h=508" />
            </a>
            <a style="position: absolute;
              left: 189px;">
              <van-image width="186"
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f37980c4dead52355e33e40eab1a2dc0.jpg?thumb=1&w=358&h=252" />
            </a>
            <a style="    position: absolute;
              left: 189px;
              top: 133px;">
              <van-image width="186"
                src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5205ae7babe7be7c290b2b2d89edffa3.jpg?thumb=1&w=358&h=252" />
            </a>
          </div>
          <div class="cells-auto-infos">
            <van-image
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a534dd562cd6bba471c7c9ad49a86e7.jpg?thumb=1&w=720&h=280" />
            <van-image
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/855871a70f11862ff24aed816351f276.jpg?thumb=1&w=720&h=440" />
            <div class="divider_line"
              style="height:8px; border-bottom: 8px solid rgb(255, 255, 255); background-color: rgb(255, 255, 255);">
            </div>
            <div style="padding: 0 6px;background-color: #fff;">
              <van-grid style="justify-content: space-between;" :border="false" :column-num="2">
                <van-grid-item style="width: 179px;flex-basis: inherit;">
                  <van-image
                    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918eafcf051967f9d212a649fad7de28.jpg?thumb=1&w=344&h=280" />
                  <div class="cells-grid-info">
                    <div class="grid-info-name">Redmi Note 8 Pro</div>
                    <div class="grid-info-brief"> 6400万全场景四摄</div>
                    <div class="grid-info-price">
                      <span>1399</span>
                      <span>起</span>
                    </div>
                    <div class="grid-info-buybtn">
                      <van-button style="height: 30px;line-height: 30px;" color="#ea625b" type="danger">立即购买
                      </van-button>
                    </div>
                  </div>
                </van-grid-item>
                <van-grid-item style="width: 179px;flex-basis: inherit;">
                  <van-image
                    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8025107813883a20d3f2d956ad80ea38.jpg?thumb=1&w=344&h=280" />
                </van-grid-item>
              </van-grid>
            </div>
            <div class="divider_line"
              style="height:1px; border-bottom: 1px solid rgb(206, 206, 206); background-color: rgb(206, 206, 206);">
            </div>
            <div class="cells-infos-more">更多小米手机产品 ></div>

          </div>
        </van-tab>
        <van-tab title="手机" name="手机">手机</van-tab>
        <van-tab title="智能" name="智能">智能</van-tab>
        <van-tab title="电视" name="电视">电视</van-tab>
        <van-tab title="笔记本" name="笔记本">笔记本</van-tab>
        <van-tab title="家电" name="家电">家电</van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style lang="stylus">
  .home {
    .van-sticky {
      transform: none !important;
    }

    .van-search {
      padding: 0;
    }

    .van-grid-item__content {
      padding: 0;
      display: inline-block;
      vertical-align: middle;

    }
  }
</style>
<style lang="stylus" scoped>
  .home {
    .header-user {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-search img {
      width: 50px;
    }

    .cells-auto-fill {
      position: relative;
    }

    .cells-grid-info {
      padding: 10px 14px;
      text-align: center;
    }

    .grid-info-name {
      font-size: 15px;
      color: rgba(0, 0, 0, .87);
    }

    .grid-info-brief {
      margin-top: 3px;
      font-size: 11px;
      line-height: 15px;
      color: rgba(0, 0, 0, .54);
    }

    .grid-info-price {
      font-size: 0.14rem;
      color: #ea625b;
      height: 22px;
      line-height: 22px;
      position: relative;
      display: inline-block;
    }

    .grid-info-price::before {
      content: "\A5";
      position: absolute;
      left: 0;
      top: 0;
      font-size: .76em;
      text-decoration: none;
    }

    .cells-infos-more {
      background: #fff;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      text-align: center;
      color: rgba(0, 0, 0, .6);
    }

  }
</style>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import buttomMenu from '@/components/buttom-menu.vue';
  @Component({
    name: 'home',
    components: {
      buttomMenu,
    },
  })
  export default class extends Vue {
    private activeName = '推荐';
    private images = [
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/36b5b151fe94bc6f0024231b9797cbfc.jpg?thumb=1&w=720&h=360',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9e8be30d7e34410bf2cedabff54875cf.jpg?thumb=1&w=720&h=360',
    ];
    private gridImages = [
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cb65daec7ef7b52cc785f88f78efba37.png?thumb=1&w=144&h=152',
      'https://i8.mifile.cn/v1/a1/eb5024fe-dfe3-6e53-3e18-675bef5fa06e.webp',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6eb2a9a73687e007daf30fc3f85e0ad2.gif',
      'https://i8.mifile.cn/v1/a1/e8bc849a-0a3b-21a0-6810-7da3a3903dee.webp',
      'https://i8.mifile.cn/v1/a1/7dbcbf87-6a58-adb6-2f3f-bb3dae3e9c80.webp',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bc1c677a6e10e42d00fb0a063662fbf9.png?thumb=1&w=144&h=152',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b14da225c4156d5ce9a78e42a3a5a8e7.jpg?thumb=1&w=144&h=152',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ff6d920e80a63e80edb21febdb266448.png?thumb=1&w=144&h=152',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7a4943684b6c577a6a0b9b141633f6bd.png?thumb=1&w=144&h=152',
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f11f9df6b0b0b428f8c8fc3267131830.png?thumb=1&w=144&h=152',
    ];
    private handelSearch() {
      console.log(1);
    }
    private handelUser() {
      this.$router.push({
        path: '/user',
      });
    }
  }
</script>