<template>
  <div>
    <v-card dark>
      <v-toolbar light>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="interlocutorUser.avatar"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{interlocutorUser.firstName}} {{interlocutorUser.lastName}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-toolbar>

      <v-container class="chat" fill-height>
        <div class="messageContainer">
          <v-container v-if="noMessages"
                       bg grid-list-md text-xs-center>
            <h3 class="darkerGrey--text title">
              Please send message and our support team will contact you.
            </h3>
          </v-container>

          <template v-for="message in messages">
            <div :class="`${getMessageType(message.UserId)} message`">

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
  </div>
</template>

<script>
  import MessageInput from './MessageInput';
  import { mapState, mapActions } from 'vuex';
  import { FileResources, Roles } from '@/common/constants';
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
      let interlocutorId;
      if (this.interlocutor) {
        interlocutorId = this.interlocutor.id;
      }

      this.initConnection();
      await this.openChat(interlocutorId);
      this.fetchMessages();
    },
    beforeDestroy() {
      this.closeConnection();
    },
    props: {
      interlocutor: Object
    },
    computed: {
      ...mapState({
        messages: state => state.Chat.messages,
        me: state => state.Auth.me,
      }),
      noMessages() {
        return _.isEmpty(this.messages);
      },
      interlocutorUser() {
        const { customer, seller } = FileResources;

        if (this.me.Role.name === Roles.USER) {
          return {
            avatar: seller,
            firstName: 'Sales',
            lastName: 'Manager'
          }
        }
        return {
          ...this.interlocutor,
          avatar: customer
        }
      }
    },
    methods: {
      ...mapActions('Chat', [
        'initConnection',
        'openChat',
        'fetchMessages',
        'closeConnection'
      ]),
      getMessageType(owner) {
        if (this.interlocutor && this.interlocutor.id !== owner) {
          return 'outcome';
        }

        if (this.me.id === owner) {
          return 'outcome';
        }
        return 'incoming';
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/components/Chat";
</style>
