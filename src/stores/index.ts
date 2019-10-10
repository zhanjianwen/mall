import Vue from 'vue';
import Vuex from 'vuex';
import { ILoginState } from './login';
Vue.use(Vuex);
export interface IRootState {
    login: ILoginState;
}
export default new Vuex.Store<IRootState>({});
