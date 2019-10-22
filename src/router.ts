import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
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
    }, {
      path: '/category',
      name: 'category',
      meta: {
        title: '分类',
      },
      component: () => import('@/views/mall/category/index.vue'),
    }, {
      path: '/cart',
      name: 'cart',
      meta: {
        title: '购物车',
      },
      component: () => import('@/views/mall/cart/index.vue'),
    }, {
      path: '/user',
      name: 'user',
      meta: {
        title: '用户',
      },
      component: () => import('@/views/mall/user/index.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      meta: {
        title: 'demo',
      },
      component: () => import('@/views/mall/test.vue'),
    },
  ],
});
