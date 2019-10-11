<template>
  <div class="login-component">
    <div>登录模板</div>
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Button,
  } from 'vant';
  @Component({
    name: 'loginComponent',
    components: {
      [Button.name]: Button,
    },
  })
  export default class extends Vue {
    private mounted() {}
  }
</script>