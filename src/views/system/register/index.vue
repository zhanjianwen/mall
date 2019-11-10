<template>
  <div>
    <div style="width:70%;margin:20px auto;height:40px">
      <!-- 配置slider组件 -->
      <slider ref="slider" :pages="pages" :options="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
        <!-- 设置loading,可自定义 -->
        <slideritem v-for="(item,index) in pages" :key="index" :style="item.style">{{item.html}}</slideritem>
        <!--<div slot="loading">loading...</div>-->
      </slider>
    </div>
  </div>
</template>

<script>
  import {
    slider,
    slideritem
  } from 'vue-concise-slider' // import slider components
  export default {
    name: 'My',
    components: {
      slider,
      slideritem
    },
    data() {
      return {
        HelloWorld_data: '',
        list: ['第一条消息', '第二条消息', '第三条消息', '第四条消息'],
        //Image list
        pages: [],
        //Sliding configuration [obj]
        sliderinit: {
          pagination: true, // 底部小圆点是否隐藏（true显示，false隐藏）
          currentPage: 0, // 当前页码
          thresholdDistance: 500, // 滑动判定距离
          thresholdTime: 100, // 滑动判定时间
          autoplay: 2000, // 自动滚动[ms]
          loop: true, // 是否循环滚动
          direction: 'vertical', // 滚动方向
          infinite: 1, // 无限滚动前后遍历数
          slidesToScroll: 1, // 滚动行数
          timingFunction: 'ease',
          duration: 300,
        }
      }
    },
    mounted() {
      // this.pages.length = this.list.length
      for (let i = 0; i < this.list.length; i++) {
        this.pages.push({
          html: '<div>' + this.list[i] + '</div>',
          style: {
            'font-size': '18px',
            'color': 'black',
            'height': '30px',
            'margin': '10px',
            'width': '100%'
          }
        });
        // this.pages[i].html = '<div class="slider' + i+1 +'">' + this.list[i] + '</div>'
      }
      console.log(this.pages);
    },
    methods: {
      // Listener event
      slide(data) {
        // console.log(data)
      },
      onTap(data) {
        console.log(this.list[data.currentPage]);
      },
      onInit(data) {
        // console.log(data)
      },
    },
  };
</script>

<style scoped>

</style>