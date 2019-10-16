import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
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
      name: 'Register',
      meta: {
        title: '注册',
      },
      component: () => import('@/views/system/register/index.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
