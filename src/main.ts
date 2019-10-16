import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores';
import api from './apis/index';
import moment from 'moment';
import _ from 'lodash';
import 'amfe-flexible';
import { Toast, Notify } from 'vant';
import '../static/geetest/gt';
Vue.use(Toast);
Vue.use(Notify);

// import FastClick from 'fastclick';
// FastClick['attach'](document.body);
declare module 'vue/types/vue' {
  interface Vue {
    $api: any;
    // $moment: any;
    // $_: any;
  }
}
declare global {
  interface Window {
    $moment: any;
    $_: any;
  }
}
Vue.prototype.$api = api;
window.$moment = moment;
window.$_ = _;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
