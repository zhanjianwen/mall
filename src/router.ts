import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Mall',
      },
      component: () => import('@/views/mall/home/index.vue'),
    }, {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('@/views/system/login/index.vue'),
    }, {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
      },
      component: () => import('@/views/system/register/index.vue'),
    },
  ],
});
