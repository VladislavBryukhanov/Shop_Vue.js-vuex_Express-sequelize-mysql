export default {
  id: 'price',
  definition: (value, currency) => {
    if (!value) return 0;

    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency
    }).format(value);
  }
}
