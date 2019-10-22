<template>
  <div class="page">
    <!-- <div class="header-menu">
      </div> -->
    <buttom-menu></buttom-menu>
    <div class="page-content">
      <div class="category">
        category
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
    name: 'category',
    components: {
      buttomMenu,
    },
  })
  export default class extends Vue {

  }
</script>