import { FileResources } from '../constants';
const fileBaseUrl = process.env.VUE_APP_CORE_API;

export default {
  id: 'imagePath',
  definition: (path, resource_type) => {
    if (!path) {
      return FileResources.defaultPreview;
    }
    return `${fileBaseUrl}/${resource_type}/${path}`;
  }
}
