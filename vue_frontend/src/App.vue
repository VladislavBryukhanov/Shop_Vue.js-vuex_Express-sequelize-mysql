<template>
  <div id="app">
    <v-app dark>
      <router-view></router-view>
      <Snackbar></Snackbar>
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
      <Chat></Chat>
    </v-app>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Chat from '@/components/Chat.vue';

export default {
  mounted() {
    this.$root.$confirmDialog = this.$refs.confirmDialog.open;
  },
  name: 'app',
  components: {
    Snackbar,
    ConfirmDialog,
    Chat
  }
}
</script>
