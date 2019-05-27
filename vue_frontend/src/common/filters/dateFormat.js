import moment from 'moment';

export default {
  id: 'dateFormat',
  definition: (value) => {
    return moment(value).format("DD.MM.YYYY");
  }
}
