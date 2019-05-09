import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Toolbar from '@/components/Toolbar.vue';
const Sign = () => import ('@/pages/Sign.vue');
const Shop = () => import ('@/pages/Shop.vue');

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
        path: '/',
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
    component: Toolbar,
    meta: {
      authorized: true,
    },
    props: {
      authorized: true,
    },
    children: [
      {
        path: '',
        name: 'shop',
        component: Shop,
      }
    ]
  },
];

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  let redirectParams = {};

  if (!store.state.Auth.authState) {
    await store.dispatch('Auth/getMe');
  }

  if (to.matched.some(route => route.meta.unauthorized)) {
    if (store.state.Auth.me) {
      redirectParams = { path: '/shop' };
    }
  }

  if (to.matched.some(route => route.meta.authorized)) {
    if (!store.state.Auth.me) {
      redirectParams = { path: '/' };
    }
  }

  next(redirectParams);
});

export default router;
