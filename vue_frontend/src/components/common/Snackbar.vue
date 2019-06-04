<template>
  <v-snackbar
    :duration="snackbar.duration"
    v-model="snackbar.visible">
    {{snackbar.message}}
    <v-btn
      flat
      @click="hideSnackbar">
      close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapState('Common',[
        'snackbar'
      ])
    },

    methods: {
      ...mapMutations('Common', [
        'hideSnackbar'
      ])
    }
  }
</script>
