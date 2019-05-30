<template>
  <div>
    <v-btn color="actionColor"
           @click="chatOpened = !chatOpened"
           dark fixed bottom right fab>
      <v-icon>chat</v-icon>
    </v-btn>
    <v-dialog v-model="chatOpened"
              max-height="55vh"
              max-width="420px">
      <v-card dark>
        <v-container class="messagesContent" fill-height max-height="55vh">
          <!--<v-container v-if="isMessagesFetched()"
                       bg fill-height grid-list-md text-xs-center >
            <v-layout row wrap align-center>
              <v-flex>
                <v-progress-circular
                  :size="100"
                  :width="10"
                  indeterminate
                  color="actionColor">
                </v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>-->

          <v-container v-if="noMessages"
                       bg grid-list-md text-xs-center>
            <h3 class="darkerGrey--text title">Please send message and our support team will contact you.</h3>
          </v-container>

          <div>
            <div v-for="message in messages">
              <div class="message"
                   :class="isMyMessage(message.who) ? 'outcome' : 'incoming'">

                <span class="content">{{message.content}}</span>

                <div class="dateOfSend">
                  <div>{{formatDateTime(message.timestamp)}}</div>
                  <div>{{formatDateDay(message.timestamp)}}</div>
                </div>
              </div>
            </div>
          </div>
        </v-container>

        <MessageInput></MessageInput>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import MessageInput from './MessageInput';
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import _ from 'lodash';

  export default {
    components: {
      MessageInput
    },
    created() {
      this.fetchMessages();
    },
    data() {
      return {
        chatOpened: false
      }
    },
    computed: {
      ...mapState('Chat', {
        messages: state => state.messages
      }),
      noMessages() {
        return _.isEmpty(this.messages);
      }
    },
    methods: {
      ...mapActions('Chat', [
        'fetchMessages'
      ]),
      isMyMessage(owner) {
        if (this.myAccount) {
          return this.myAccount.uid === owner;
        }
      },
      formatDateTime(date) {
        return moment(date).format('hh:mm:ss');
      },
      formatDateDay(date) {
        return moment(date).format('DD MMM');
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/components/Chat";
</style>
