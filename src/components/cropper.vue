<template>
  <div class="cropper">
    <div class="wrapper">
      <van-row class="user-links">
          <van-col span="6">
            <van-icon name="pending-payment" />
            待付款
          </van-col>
          <van-col span="6">
            <van-icon name="records" />
            待接单
          </van-col>
          <van-col span="6">
            <van-icon name="tosend" />
            待发货
          </van-col>
          <van-col span="6">
            <van-icon name="logistics" />
            已发货
          </van-col>
        </van-row>
    
        <van-cell-group class="user-group">
          <van-cell icon="records" title="全部订单" is-link />
        </van-cell-group>
    
        <van-cell-group>
          <van-cell icon="points" title="我的积分" is-link />
          <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
          <van-cell icon="gift-o" title="我收到的礼物" is-link />
        </van-cell-group>
    </div>
  </div>
</template>
<style scoped lang="stylus">
  body,
  html {
    height: 100%;
  }

  .box {
    position: relative;
    height: 100%;
  }

  .wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    height: calc(100% - 50px);
  }

  .vue-cropper {
    background: black;
    background-image: none !important;
  }

  .btn {
    height: 50px;
    background: #565656;
    width: 100%;
    padding: 0 15px;
  }

  .btn a {
    color: white;
    font-size: .16rem;
    display: inline-block;
    line-height: 50px;
  }

  .btn a:nth-of-type(1) {
    float: left;
  }

  .btn a:nth-of-type(2) {
    float: right;
  }
</style>
<script lang="ts">
  // import VueCropper from 'vue-cropper';
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Image,
    Row, Col, Icon, Cell, CellGroup,
  } from 'vant';
  @Component({
    name: 'cropper',
    components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
      // VueCropper,
    },
  })
  export default class extends Vue {
    private tests = {
      height: '10rem',
      width: '10rem',
      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
    };
    private previews = {};
    private option = {
      img: 'http://cdn.xyxiao.cn/Landscape_1.jpg',
      size: 1,
      full: false,
      outputType: 'png',
      canMove: true,
      fixedBox: false,
      original: false,
      canMoveBox: true,
      autoCrop: true,
      // 只有自动截图开启 宽度高度才生效
      autoCropWidth: 200,
      autoCropHeight: 150,
      centerBox: false,
      high: false,
      cropData: {},
      enlarge: 1,
      mode: 'contain',
      maxImgSize: 2000,
    };
    private realTime(data: any) {
      const previews = data;
      const h = 0.5;
      const w = 0.2;
      this.previews = data;
    }
    private imgLoad(msg: any) {
      console.log(msg);
    }
    private uploadImg(e: any, num: any) {
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    }
    private cropMoving(data: any) {
      this.option.cropData = data;
    }
  }
</script>