<template>
  <div>
    <ProductList></ProductList>
    <ProductBuilder></ProductBuilder>
  </div>
</template>

<script>
  import ProductBuilder from '../components/admin/ProductBuilder';
  import ProductList from '../components/ProductList';

  export default {
    components: {
      ProductBuilder,
      ProductList
    }
  }
</script>
