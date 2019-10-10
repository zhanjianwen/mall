import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores';
import api from './apis/index';
import moment from 'moment';
import _ from 'lodash';
// import FastClick from 'fastclick';
// FastClick['attach'](document.body);
declare global {
  interface Window {
    $api: any;
    $moment: any;
    $_: any;
  }
}
window.$api = api;
window.$moment = moment;
window.$_ = _;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
