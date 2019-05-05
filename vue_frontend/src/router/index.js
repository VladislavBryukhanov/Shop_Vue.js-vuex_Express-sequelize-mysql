import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
// const Sign = () => import ('../pages/Sign.vue');
import Sign from '../pages/Sign.vue';
const Toolbar = () => import ('../components/Toolbar.vue');

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Toolbar,
    meta: {
      unauthorized: true,
    },
    children: [
      {
        path: '',
        name: 'sign_in',
        component: Sign,
      },
      {
        path: 'sign_up',
        name: 'sign_up',
        component: Sign,
        props: {
          isSignUp: true
        }
      }
    ]
  },
  {
    path: '/shop',
    meta: {
      authorized: true,
    },
    children: [
      {
        path: '',
        name: 'shop',
        component: Sign,
      }
    ]
  }
];

const router = new Router({
  mode: 'history',
  routes
});

/*router.beforeEach(async (to, from, next) => {
  let redirectParams = {};

  if (!store.state.me) {
    await store.dispatch('Auth/getMe');
  }

  if (to.matched.some(route => route.meta.unauthorized)) {
    if (store.state.me) {
      redirectParams = { path: '/shop' };
    }
  }

  if (to.matched.some(route => route.meta.authorized)) {
    if (!store.state.me) {
      redirectParams = { path: '/' };
    }
  }

  next(redirectParams);
});*/

export default router;
