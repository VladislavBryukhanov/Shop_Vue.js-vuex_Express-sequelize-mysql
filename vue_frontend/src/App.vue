<template>
  <div id="app">
    <v-app dark>
      <router-view></router-view>
      <Snackbar></Snackbar>
    </v-app>
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
