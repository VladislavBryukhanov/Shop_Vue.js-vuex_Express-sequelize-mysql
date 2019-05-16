import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import store from './store';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#14aba8',
    // primary: '#558DC4',
    whiteShadow: '#f1f1f1',
    solid_dark: '#282828',
    solid_black: '#161616',
    onlineColor: '#558DC4',
    darkerGrey: '#aaa',
    offlineColor: '#ffffff',
    afkColor: '#FFF171',
    incomingMessage: '#243443',
    outcomeMessage: '#1A567B',
    lightBlue: '#6B9BC2',
    darkRed: '#a43931',
    lightIonic: '#14aba8',
    lincIonicColor: '#00aca2',
    darkIonic: '#00726a',
  },
});
Vue.config.productionTip = false;

import { defaultPreview } from './models/constants';
Vue.filter('imagePath', (path) => {
  if (!path) {
    // return './assets/img/prod_preview.jpg';
    return defaultPreview;
  }
  // return `${HOST_URL}/${resource_type}/${path}`;
  return `http://localhost:3000/preview_photo/${path}`;
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
