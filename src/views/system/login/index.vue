<template>
  <div class="login">

    <div class="login-title">
      <h4>使用 XMall 账号 登录官网</h4>
    </div>
    <login-form v-model="userInfos"></login-form>
    <div id="captcha">
      <p id="wait">正在加载验证码...</p>
    </div>
    <van-button class="login-button" style="width: 80%;" @click=" handleLogin" type="primary">登录
    </van-button>
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
  let captcha;
  import {
    setStore,
    getStore,
    removeStore,
  } from '@/utils/storage.ts';
  import loginForm from '@/components/loginForm/index.vue';
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Button,
  } from 'vant';
  @Component({
    name: 'Login',
    components: {
      loginForm,
      [Button.name]: Button,
    },
  })
  export default class extends Vue {
    private userInfos = {
      userName: 'test',
      userPwd: 'test',
      challenge: '',
      seccode: 'e2e29827e20bb27586f6eb10a1f651aa|jordan',
      statusKey: '',
      validate: 'e2e29827e20bb27586f6eb10a1f651aa',
    };
    private logintxt = '登录';
    private cart = [];
    private autoLogin = false
    // private statusKey = '';
    private mounted() {
      this.getTest();
      this.getRemembered();
      this.login_addCart();
    }
    private getRemembered(){
      let judge = getStore('remember')
      if (judge === 'true') {
        this.autoLogin = true;
        this.userInfos.userName = getStore('rusername');
        this.userInfos.userPwd = getStore('rpassword');
      }
    }
    private rememberPass() {
      if (this.autoLogin === true) {
        setStore('remember', 'true')
        setStore('rusername', this.userInfos.userName)
        setStore('rpassword', this.userInfos.userPwd)
      } else {
        setStore('remember', 'false')
        removeStore('rusername')
        removeStore('rpassword')
      }
    }
    private handleLogin() {
      this.logintxt = '登录中...'
      this.rememberPass()
      if (!this.userInfos.userName || !this.userInfos.userPwd) {
        console.log(账号或者密码不能为空)
        return false
      }
      let result = captcha.getValidate()
      if (!result) {
        this.message('请完成验证')
        this.logintxt = '登录'
        return false
      }
      console.log(result)
      this.userInfos.challenge = result.geetest_challenge;
      this.userInfos.validate = result.geetest_validate;
      this.userInfos.seccode = result.geetest_seccode;
      this.$api.system.postLogin(this.userInfos).then((res: any) => {
        console.log(res);
        if (res.result.state === 1) {
          setStore('token', res.result.token)
          setStore('userId', res.result.id)
          // 登录后添加当前缓存中的购物车
          if (this.cart.length) {
            for (var i = 0; i < this.cart.length; i++) {
              addCart(this.cart[i]).then(res => {
                if (res.success === true) {}
              })
            }
            removeStore('buyCart')
            this.$router.push({
              path: '/'
            })
          } else {
            this.$router.push({
              path: '/'
            })
          }
        } else {
          this.logintxt = '登录'
          console.log(res.result.message)
          // this.message(res.result.message)
          captcha.reset()
          return false
        }
      });
    }
    private getTest() {
      this.$api.system.getTest(this.userInfos).then((res: any) => {
        console.log(res);
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
          captcha = captchaObj;
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(() => {
            (window as any).document.getElementById('wait').style.display = 'none';
          });
        });
      });
    }
    private login_back() {
      this.$router.go(-1)
    }
    // 登陆时将本地的添加到用户购物车
    private login_addCart() {
      let cartArr = []
      let locaCart = JSON.parse(getStore('buyCart'))
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore('userId'),
            productId: item.productId,
            productNum: item.productNum
          })
        })
      }
      this.cart = cartArr
    }
  }
</script>