<template>
  <div>
    <v-btn color="actionColor"
           @click="chatOpened = !chatOpened"
           dark fixed bottom right fab>
      <v-icon>chat</v-icon>
    </v-btn>
    <v-dialog v-model="chatOpened"
              light
              height="350"
              width="350">
      <v-card>
        <div class="messagesContent">
          <v-container bg fill-height grid-list-md text-xs-center v-if="isMessagesFetched()">
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
          </v-container>

          <template v-for="message in messages">
            <div class="message"
                 :class="isMyMessage(message.who) ? 'outcome' : 'incoming'">
              <!--<div class="arrow-left"></div>-->


              <!--<div class="dateOfSend">-->
                <!--<div>{{formatDateTime(message.timestamp)}}</div>-->
                <!--<div>{{formatDateDay(message.timestamp)}}</div>-->
              <!--</div>-->
            </div>
          </template>
        </div>

        <MessageInput></MessageInput>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import MessageInput from './MessageInput';
  import { mapState } from 'vuex';
  import _ from 'lodash';

  export default {
    components: {
      MessageInput
    },
    data() {
      return {
        chatOpened: false
      }
    },
    computed: {
      ...mapState('Chat', {
        messages: state => state.messages
      })
    },
    methods: {
      isMessagesFetched() {
        return _.isEmpty(this.messages);
      },
      isMyMessage(owner) {
        if (this.myAccount) {
          return this.myAccount.uid === owner;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/components/Chat";
</style>
