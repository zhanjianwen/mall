import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from './index';
export interface ILoginState {
  // 用户名
  userName: string;
  // 用户密码
  userPwd: string ;
}
@Module({ dynamic: true, store, name: 'user' })
class Login extends VuexModule implements ILoginState {
  public userName = 'zjw';
  public userPwd = '123';
  get getUserInfo() {
    console.log(this.userName);
    return '';
  }
  @Mutation
  private setUserInfo(n: string) {
    console.log(n);
  }
  @Action
  private async  fetchNewUserInfo(wheelStore: string) {
    // const wheels = await get(wheelStore)
    this.context.commit('setUserInfo', '123');
  }
}
export const LoginModule = getModule(Login);
