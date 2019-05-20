<template>
  <v-dialog v-model="dialogOpened"
            light
            width="350">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat
               @click="confirm"
               color="actionColor">
          Confirm
        </v-btn>
        <v-btn flat
               @click="cancel"
               color="removingColor">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogOpened: false,
        title: '',
        message: '',
        resolve: null,
      }
    },
    methods: {
      open(title, message) {
        this.dialogOpened = !this.dialogOpened;
        this.title = title;
        this.message = message;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
        })
      },
      confirm() {
        this.resolve(true);
        this.dialogOpened = !this.dialogOpened;
      },
      cancel() {
        this.resolve(false);
        this.dialogOpened = !this.dialogOpened;
      }
    }
  }
</script>
