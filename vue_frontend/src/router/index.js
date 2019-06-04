import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { Roles } from '@/common/constants';

import Toolbar from '@/components/common/Toolbar.vue';
import NavigationBar from '@/components/common/NavigationBar.vue'

const Sign = () => import ('@/components/pages/Sign.vue');
const ProductList = () => import ('@/components/pages/ProductList.vue');
const PageNotFound = () => import ('@/components/pages/PageNotFound.vue');

const ProductBuilder = () => import ('@/components/pages/admin/ProductBuilder.vue');
const UserList = () => import ('@/components/pages/admin/UserList.vue');
const ShoppingCart = () => import ('@/components/pages/ShoppingCart.vue');
const OrderList = () => import ('@/components/pages/OrderList.vue');

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
          topProducts: true
        }
      },
      {
        path: '/builder',
        name: 'builder',
        component: ProductBuilder,
        props: (route) => ({
          editableProduct: route.params.editableProduct
        }),
        meta: {
          requiredRoles: [ Roles.MANAGER, Roles.ADMIN ]
        }
      },
      {
        path: '/users',
        name: 'users',
        component: UserList,
        meta: {
          requiredRoles: [ Roles.MANAGER, Roles.ADMIN ]
        }
      },
      {
        path: '/shopping_cart',
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
    name: 'not_found',
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

  if (to.matched.some(route => (route.meta.requiredRoles &&
      !route.meta.requiredRoles.includes(store.state.Auth.me.Role.name)))) {
    redirectParams = { name: 'not_found' };
  }

  next(redirectParams);
});

export default router;
