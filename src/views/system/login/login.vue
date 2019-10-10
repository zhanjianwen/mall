<template>
  <div>
    <div @click="handleLogOut">login</div>
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  @Component({
    name: 'Login',
  })
  export default class extends Vue {
    private handleLogOut() {
      console.log(1);
    }
    private mounted() {
      window.$api.system.postLogin({}).then((req: any) => {
        console.log(req);
      });
    }
  }
</script>