<template>
  <div class="test">123
    <cropper></cropper>
  </div>
</template>
<script lang="ts">
 
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import {
    Divider,
  } from 'vant';
  import cropper from '@/components/cropper.vue';
  @Component({
    name: 'test',
    components: {
      cropper,
    },
  })
  export default class extends Vue { }
</script>