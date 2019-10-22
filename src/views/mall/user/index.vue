<template>
  <div class="page">
    <buttom-menu></buttom-menu>
    <div class="page-content">
      <div class="user">
        user
      </div> 
    </div>
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import buttomMenu from '@/components/buttom-menu.vue';
  @Component({
    name: 'user',
    components: {
      buttomMenu,
    },
  })
  export default class extends Vue {

  }
</script>