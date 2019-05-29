<template>
  <v-form class="messageInput" @submit.prevent="sendMessage()" >
    <v-btn flat icon>
      <v-icon>attach_file</v-icon>
    </v-btn>
    <input
      v-model="messageContent"
      placeholder="Enter message"/>
    <v-btn
      flat icon
      type="submit">
      <v-icon>send</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        messageContent: ''
      }
    },
    methods: {
      ...mapActions('Chat', {
        sendMessageAction: 'sendMessage'
      })
    },
    sendMessage() {
      if (_.isEmpty(this.messageContent.trim())) {
        return;
      }
      this.sendMessageAction(this.messageContent);
    }
  }
</script>


<style lang="scss">
  @import "../assets/scss/components/MessageInput";
</style>
