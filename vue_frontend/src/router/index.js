import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Toolbar from '@/components/Toolbar.vue';
import NavigationBar from '@/components/NavigationBar.vue'

const Sign = () => import ('@/pages/Sign.vue');
const ProductList = () => import ('@/pages/ProductList.vue');
const PageNotFound = () => import ('@/pages/PageNotFound.vue');

const ProductBuilder = () => import ('@/pages/admin/ProductBuilder.vue');
const ShoppingCart = () => import ('@/pages/ShoppingCart.vue');
const OrderList = () => import ('@/pages/OrderList.vue');

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
        path: '/products/:category',
        name: 'products',
        component: ProductList,
      },
      {
        path: '/top_products',
        name: 'top_products',
        component: ProductList,
        props: {
          top_products: true
        }
      },
      {
        path: '/builder',
        name: 'builder',
        component: ProductBuilder,
        props: (route) => ({
          editableProduct: route.params.editableProduct
        })
      },
      {
        path: '/shopping_card',
        name: 'shopping_cart',
        component: ShoppingCart
      },
      {
        path: '/orders',
        name: 'orders',
        component: OrderList
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
      redirectParams = { path: '/top_products' };
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
