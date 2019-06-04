<template>
  <div id="app">
    <v-app dark>
      <router-view></router-view>
      <Snackbar></Snackbar>
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-app>
  </div>
</template>

<script>
import Snackbar from '@/components/common/Snackbar.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

export default {
  mounted() {
    this.$root.$confirmDialog = this.$refs.confirmDialog.open;
  },
  name: 'app',
  components: {
    Snackbar,
    ConfirmDialog
  }
}
</script>
