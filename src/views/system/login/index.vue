<template>
  <div class="login">
    <van-skeleton :row="3" :loading="loading">
      <div class="login-title">
        <h4>使用 XMall 账号 登录官网</h4>
      </div>
      <login-form @submit="handleLogin" :logintxt="logintxt" v-model="userInfos"></login-form>
    </van-skeleton>
  </div>
</template>
<style scoped lang="stylus">
  .login-button {
    margin-top: 30px;
  }

  .login-title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
    position: relative;
    background-image: url('../../../../static/images/smartisan_4ada7fecea.png');
    background-size: 140px;
    background-position: top;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
  }

  .login-title h4 {
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    font-weight: 700;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    border-bottom: 0;
    box-shadow: none;
    line-height: 1em;
    height: auto;
    color: #333;
    font-weight: 400;
  }
</style>
<script lang="ts">
  import {
    setStore,
    getStore,
    removeStore,
  } from '@/utils/storage.ts';
  import loginForm from '@/components/loginForm.vue';
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Skeleton,
  } from 'vant';
  @Component({
    name: 'login',
    components: {
      loginForm,
      [Skeleton.name]: Skeleton,
    },
  })
  export default class Login  extends Vue {
    private userInfos = {
      userName: 'test',
      userPwd: 'test',
      challenge: '',
      seccode: 'e2e29827e20bb27586f6eb10a1f651aa|jordan',
      statusKey: '',
      validate: 'e2e29827e20bb27586f6eb10a1f651aa',
      autoLogin: false,
    };
    private captcha: any;
    private loading = true;
    private logintxt = '登录';
    private cart = [{
      a: 1,
    }];
    private mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 300);
      this.getTest();
      this.getRemembered();
      this.login_addCart();
    }
    private getRemembered() {
      const judge = getStore('remember');
      if (judge === 'true') {
        this.userInfos.autoLogin = true;
        const rusername: any = getStore('rusername');
        const rpassword: any = getStore('rusername');
        this.userInfos.userName = rusername;
        this.userInfos.userPwd = rpassword;
      }
    }
    private rememberPass() {
      if (this.userInfos.autoLogin === true) {
        setStore('remember', 'true');
        setStore('rusername', this.userInfos.userName);
        setStore('rpassword', this.userInfos.userPwd);
      } else {
        setStore('remember', 'false');
        removeStore('rusername');
        removeStore('rpassword');
      }
    }
    private handleLogin() {
      const __SELF = this;
      __SELF.logintxt = '登录中...';
      __SELF.rememberPass();
      if (!__SELF.userInfos.userName || !__SELF.userInfos.userPwd) {
        return false;
      }
      const result = __SELF.captcha.getValidate();
      if (!result) {
        console.log('请完成验证');
        this.logintxt = '登录';
        return false;
      }
      this.userInfos.challenge = result.geetest_challenge;
      this.userInfos.validate = result.geetest_validate;
      this.userInfos.seccode = result.geetest_seccode;
      this.$api.system.postLogin(this.userInfos).then((res: any) => {
        if (res.result.state === 1) {
          setStore('token', res.result.token);
          setStore('userId', res.result.id);
          // 登录后添加当前缓存中的购物车
          debugger
          if (this.cart.length) {
            for (const cart of this.cart) {
              this.$api.good.postAddCart(cart).then((res: any) => {
                if (res.success === true) {
                  console.log(1);
                }
              });
            }
            removeStore('buyCart');
            this.$router.push({
              path: '/',
            });
          } else {
            this.$router.push({
              path: '/',
            });
          }
        } else {
          this.logintxt = '登录';
          this.captcha.reset();
          return false;
        }
      });
    }
    private getTest() {
      this.$api.system.getTest(this.userInfos).then((res: any) => {
        this.userInfos.statusKey = res.statusKey;
        (window as any).initGeetest({
          gt: res.gt,
          challenge: res.challenge,
          new_captcha: res.new_captcha,
          offline: !res.success,
          product: 'popup',
          width: '100%',
        }, (captchaObj: any) => {
          if (!captchaObj) {
            return;
          }
          this.captcha = captchaObj;
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(() => {
            (window as any).document.getElementById('wait').style.display = 'none';
          });
        });
      });
    }
    private login_back() {
      this.$router.go(-1);
    }
    // 登陆时将本地的添加到用户购物车
    private login_addCart() {
      const cartArr: any = [];
      const locaCart = (JSON as any).parse(getStore('buyCart'));
      if (locaCart && locaCart.length) {
        locaCart.forEach((item: any) => {
          cartArr.push({
            userId: getStore('userId'),
            productId: item.productId,
            productNum: item.productNum,
          });
        });
      }
      this.cart = cartArr;
    }
  }
</script>