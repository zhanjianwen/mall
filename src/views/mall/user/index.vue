<template>
  <div class="user">
    user
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';

  @Component({
    name: 'user',
    components: {},
  })
  export default class extends Vue {}
</script>