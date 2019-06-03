<template>
  <div>
    <v-btn color="actionColor"
           @click="chatOpened = !chatOpened"
           dark fixed bottom right fab>
      <v-icon>chat</v-icon>
    </v-btn>
    <v-dialog v-model="chatOpened"
              max-width="420px">
      <v-card dark>
        <v-toolbar light>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="seller"/>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <!--<v-list-tile-title>{{interlocutor.login}}</v-list-tile-title>-->
              <v-list-tile-title>Sales manager</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-toolbar>

        <v-container class="chat" fill-height>
          <div class="messageContainer">
            <v-container v-if="noMessages"
                         bg grid-list-md text-xs-center>
              <h3 class="darkerGrey--text title">Please send message and our support team will contact you.</h3>
            </v-container>

            <template v-for="message in messages">
              <div class="message"
                   :class="isMyMessage(message.UserId) ? 'outcome' : 'incoming'">

                <span class="content">{{message.textContent}}</span>

                <div class="dateOfSend">
                  <div>{{message.timestamp | formatDateTime}}</div>
                  <div>{{message.timestamp | formatDateDay}}</div>
                </div>
              </div>
            </template>
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
  import { FileResources } from '@/common/constants';
  import moment from 'moment';
  import _ from 'lodash';

  export default {
    components: {
      MessageInput
    },
    filters: {
      formatDateTime: (value) => {
        return moment(value).format('hh:mm:ss');
      },
      formatDateDay: (value) => {
        return moment(value).format('DD MMM');
      },
    },
    async created() {
      await this.initConnection();
      await this.fetchMessages({
        offset: 0,
        limit: 100,
      });
    },
    beforeDestroy() {
      this.closeConnection();
    },
    data() {
      return {
        chatOpened: false,
        seller: FileResources.seller,
        customer: FileResources.customer,
      }
    },
    computed: {
      ...mapState('Chat', {
        messages: state => state.messages
      }),
      ...mapState('Auth', {
        me: state => state.me
      }),
      noMessages() {
        return _.isEmpty(this.messages);
      }
    },
    methods: {
      ...mapActions('Chat', [
        'initConnection',
        'fetchMessages',
        'closeChat'
      ]),
      isMyMessage(owner) {
        return this.me.id === owner;
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/components/Chat";
</style>
