<template>
  <div class="login-from">
    <van-cell-group class="login-user-group">
      <van-field v-model="value.userName" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名"
        @click-right-icon="$toast('question')" />
      <van-field v-model="value.userPwd" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <div id="captcha">
      <p id="wait">正在加载验证码...</p>
    </div>
    <div class="login-rememberPwd">
      <van-checkbox v-model="value.autoLogin" style="display: inline-flex;vertical-align: middle;" shape="square">记住密码
      </van-checkbox>
      <a class="login-register" @click="toRegister">注册 XMall 账号</a>
      <a class="login-forgetPwd" @click="$notify('找回密码','请联系作者邮箱找回密码或使用测试账号登录：test | test')">忘记密码 ?</a>
    </div>
    <van-button class="login-button" style="width: 100%" @click="handleLogin" type="primary">{{logintxt}}
    </van-button>
    <!-- <div>登录模板</div> -->
  </div>
</template>
<style scoped lang="stylus">
  .login-from {
    padding: 0 30px 20px;
  }

  .login-from .login-user-group {
    margin-bottom: 15px;
  }

  .login-from #captcha {
    margin-bottom: 15px;
  }

  .login-from .login-rememberPwd {
    padding-bottom: 20px;
    text-align: right;
    font-size: 14px;
  }

  .login-from .login-rememberPwd a {
    font-style: normal;
    text-decoration: none;
    color: #5079d9;
    cursor: pointer;
    transition: all .15s ease-out;
  }

  .login-from .login-register,
  .login-from .login-forgetPwd {
    padding: 1px 0px 0px 10px;
  }
</style>
<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
  } from 'vue-property-decorator';
  import {
    CellGroup,
    Field,
    Cell,
    Button,
    Checkbox,
  } from 'vant';
  @Component({
    name: 'login-from',
    components: {
      [Cell.name]: Cell,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox,
    },
  })
  export default class extends Vue {
    @Prop() private value!: object;
    @Prop() private logintxt!: string;
    private handleLogin() {
      let __SELF = this;
      __SELF.$emit('submit');
    }
    private toRegister() {
      let __SELF = this;
      __SELF.$router.push({
        path: '/register',
      });
    }
  }
</script>