<template>
  <div>
    <login-component></login-component>
    <van-button style="height: 30px;line-height: 30px;" @click="handleLogOut" type="primary">login</van-button>
  </div>
</template>
<script lang="ts">
  import {
    loginComponent
  } from '@Components/login/login.vue';
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
      [Button.name]: Button,
      loginComponent: loginComponent
    },
  })
  export default class extends Vue {
    private handleLogOut() {
      console.log(1);
    }
    private mounted() {
      this.$api.system.postLogin({}).then((req: any) => {
        console.log(req);
      });
    }
  }
</script>