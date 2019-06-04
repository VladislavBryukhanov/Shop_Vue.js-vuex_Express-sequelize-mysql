<template>
  <v-card light>
    <v-form class="messageInput" @submit.prevent="sendMessage" light>
      <input
        v-model="messageContent"
        placeholder="Enter message"/>
      <v-btn
        flat icon
        type="submit">
        <v-icon>send</v-icon>
      </v-btn>
    </v-form>
  </v-card>
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
      }),
      async sendMessage() {
        const { messageContent, sendMessageAction } = this;

        if (_.isEmpty(messageContent.trim())) {
          return;
        }

        await sendMessageAction(messageContent);
        this.messageContent = '';
      }
    },
  }
</script>


<style lang="scss">
  @import "../../assets/scss/components/MessageInput";
</style>
