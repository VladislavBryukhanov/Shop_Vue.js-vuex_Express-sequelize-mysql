<template>
  <div id="app">
    <router-view></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'app',
  components: {
    Snackbar
  }
}
</script>
