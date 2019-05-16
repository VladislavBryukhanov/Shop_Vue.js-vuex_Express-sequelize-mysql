import { defaultPreview } from '../constants';

export default {
  id: 'imagePath',
  definition: (path) => {
    if (!path) {
      return defaultPreview;
    }
    // return `${HOST_URL}/${resource_type}/${path}`;
    // return `${process.env.BASE_URL}/preview_photo/${path}`;
    return `http://localhost:3000/preview_photo/${path}`;
  }
}
