import Vue from 'vue';
import { defaultPreview } from '../models/constants';

Vue.filter('imagePath', (path) => {
  if (!path) {
    // return defaultPreview;
    return '../assets/img/prod_preview.jpg';
  }
  // return `${HOST_URL}/${resource_type}/${path}`;
  return `http://localhost:3000/preview_photo/${path}`;
});
