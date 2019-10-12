<template>
  <div class="login-from">
    <van-cell-group>
      <van-field v-model="value.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="value.passWord" label="手机号" placeholder="请输入密码" />
    </van-cell-group>
    <!-- <div>登录模板</div> -->
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
  } from 'vue-property-decorator';
  import {
    CellGroup,
    Field,
    Cell,
  } from 'vant';
  @Component({
    name: 'login-from',
    components: {
      [Cell.name]: Cell,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
    },
  })
  export default class extends Vue {
    @Prop() private value!: object;
  }
</script>