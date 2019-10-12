<template>
  <van-divider :style="{margin:0}" />
</template>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Divider,
  } from 'vant';
  @Component({
    name: 'login-from',
    components: {
      [Divider.name]: Divider,
    },
  })
  export default class extends Vue {}
</script>