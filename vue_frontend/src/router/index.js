import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Toolbar from '@/components/Toolbar.vue';
import NavigationBar from '@/components/NavigationBar.vue'
const PageNotFound = () => import ('@/pages/PageNotFound.vue');
const Sign = () => import ('@/pages/Sign.vue');
const ProductList = () => import ('@/components/ProductList.vue');
const ProductBuilder = () => import ('@/pages/admin/ProductBuilder.vue');

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
    path: '/',
    component: NavigationBar,
    meta: {
      authorized: true,
    },
    children: [
      {
        path: '/products',
        name: 'products',
        component: ProductList,
      },
      {
        path: '/builder',
        name: 'builder',
        component: ProductBuilder,
        props: (route) => ({
          editableProduct: route.params.editableProduct
        })
      }
    ]
  },
  {
    path: '*',
    component: PageNotFound
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
      redirectParams = { path: '/products' };
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
