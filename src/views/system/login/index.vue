<template>
  <div class="login">

    <div class="login-title">
      <h4>使用 XMall 账号 登录官网</h4>
    </div>
    <login-form v-model="userInfos"></login-form>
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
      challenge: '298bd97020a506a4eb1273f8724462b7cx',
      seccode: 'e2e29827e20bb27586f6eb10a1f651aa|jordan',
      statusKey: 'e771b02c-656c-4676-ab2e-44c90ca5b2f7',
      validate: 'e2e29827e20bb27586f6eb10a1f651aa',
    };
    private handleLogin() {
      this.$api.system.postLogin(this.userInfos).then((req: any) => {
        console.log(req);
      });
    }
  }
</script>