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
    name: 'divider',
    components: {
      [Divider.name]: Divider,
    },
  })
  export default class extends Vue {}
</script>