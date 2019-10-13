<template>
  <div class="login-from">
    <van-cell-group>
      <van-field v-model="value.userName" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名"
        @click-right-icon="$toast('question')" />
      <van-field v-model="value.userPwd" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <!-- <div>登录模板</div> -->
  </div>
</template>
<style lang="stylus">
  
  .login-from .van-cell--required::before {
    left: 0.7rem;
  }
</style>
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