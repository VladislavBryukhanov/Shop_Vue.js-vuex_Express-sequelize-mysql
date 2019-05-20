import { FileResources } from '../constants';
const fileBaseUrl = process.env.VUE_APP_CORE_API;

export default {
  id: 'imagePath',
  definition: (path, resource_type, size_mode) => {
    if (!path) {
      return FileResources.defaultPreview;
    }

    if (size_mode) {
      return `${fileBaseUrl}/${resource_type}/${size_mode}/${path}`;
    }

    return `${fileBaseUrl}/${resource_type}/${path}`;
  }
}
