<template>
  <div>
      <van-icon name="pending-payment" />
  </div>
</template>
<script>
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Icon,
  } from 'vant';
  @Component({
    name: 'cropper',
    components: {
      [Icon.name]: Icon,
    },
  })
  export default class extends Vue {
  }
</script>