<template>
  <div class="login">
    <login-form v-model="userInfos"></login-form>
    <van-button class="login-button" style="width: 80%;" @click=" handleLogin" type="primary">login
    </van-button>
  </div>
</template>
<style scoped lang="stylus">
  .login-button {
    margin-top: 30px;
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
      userName: 'zjw',
      passWord: '123',
    };
    private handleLogin() {
      this.$api.system.postLogin(this.userInfos).then((req: any) => {
        console.log(req);
      });
    }
  }
</script>