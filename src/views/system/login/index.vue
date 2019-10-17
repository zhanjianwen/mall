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
  export default class Login extends Vue {
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
    private cart = [];
    private mounted() {
      const __SELF = this;
      setTimeout(() => {
        __SELF.loading = false;
      }, 300);
      __SELF.getTest();
      __SELF.getRemembered();
      __SELF.login_addCart();
    }
    private getRemembered() {
      const __SELF = this;
      const judge = getStore('remember');
      if (judge === 'true') {
        __SELF.userInfos.autoLogin = true;
        const rusername: any = getStore('rusername');
        const rpassword: any = getStore('rusername');
        __SELF.userInfos.userName = rusername;
        __SELF.userInfos.userPwd = rpassword;
      }
    }
    private rememberPass() {
      const __SELF = this;
      if (__SELF.userInfos.autoLogin === true) {
        setStore('remember', 'true');
        setStore('rusername', __SELF.userInfos.userName);
        setStore('rpassword', __SELF.userInfos.userPwd);
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
        __SELF.logintxt = '登录';
        return false;
      }
      const params = {
        userName: __SELF.userInfos.userName,
        userPwd: __SELF.userInfos.userPwd,
        statusKey: __SELF.userInfos.statusKey,
        challenge: result.geetest_challenge,
        seccode: result.geetest_seccode,
        validate: result.geetest_validate,
      };
      __SELF.$api.system.postLogin(params).then((res: any) => {
        if (res.result.state === 1) {
          setStore('token', res.result.token);
          setStore('userId', res.result.id);
          // 登录后添加当前缓存中的购物车
          if (__SELF.cart.length) {
            for (const cart of __SELF.cart) {
              __SELF.$api.good.postAddCart(cart).then((resCart: any) => {
                if (resCart.success === true) {
                  console.log(1);
                }
              });
            }
            removeStore('buyCart');
            __SELF.$router.push({
              path: '/',
            });
          } else {
            __SELF.$router.push({
              path: '/',
            });
          }
        } else {
          __SELF.logintxt = '登录';
          __SELF.captcha.reset();
          return false;
        }
      });
    }
    private getTest() {
      const __SELF = this;
      __SELF.$api.system.getTest(__SELF.userInfos).then((res: any) => {
        __SELF.userInfos.statusKey = res.statusKey;
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
          __SELF.captcha = captchaObj;
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(() => {
            (window as any).document.getElementById('wait').style.display = 'none';
          });
        });
      });
    }
    private login_back() {
      const __SELF = this;
      __SELF.$router.go(-1);
    }
    // 登陆时将本地的添加到用户购物车
    private login_addCart() {
      const __SELF = this;
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
      __SELF.cart = cartArr;
    }
  }
</script>