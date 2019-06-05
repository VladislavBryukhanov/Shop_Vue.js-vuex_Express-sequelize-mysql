<template>
  <v-container>
    <div class="text-xs-center">
      <v-container>
        <v-layout justify-center>
          <v-flex xl4 lg6 md8 sm10 xs12>
            <v-card>
              <v-card-text>
                <!--TODO search by name-->
                <v-pagination
                  v-model="currentPage"
                  :total-visible="8"
                  :length="pageCount"
                ></v-pagination>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-layout>
      <v-flex sm10 offset-sm1>
        <v-sheet elevation="6">
          <v-list>
            <v-flex v-if="noUsers">
              <v-container>
                <h3 class="display-1 font-weight-light primary--text">Users loading...</h3>
              </v-container>
            </v-flex>

            <template v-for="user in users">
              <v-divider>
              </v-divider>

              <v-list-group :key="user.id">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.email}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{user.firstName}} {{user.lastName}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>Account created at: {{user.createdAt | dateFormat}}</v-list-tile-action-text>
                      <v-list-tile-action-text class="font-weight-bold removingColor--text">{{user.Role.name}}</v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>

                <v-list-tile>
                  <v-layout justify-center>
                    <v-btn @click="openChat(user)" block flat class="font-weight-black"
                           color="primary">Open chat</v-btn>
                  </v-layout>
                  <v-layout justify-center>
                    <v-btn @click="openOrderList(user)" block flat class="font-weight-black"
                           color="white">Show order list</v-btn>
                  </v-layout>
                  <v-layout justify-center v-if="isAdmin">
                    <v-select :value.sync="user.Role"
                              return-object
                              @change="onRoleChanged($event, user)"
                              item-text="name"
                              label="Role"
                              :items="availableRoles"/>
                  </v-layout>
                </v-list-tile>
              </v-list-group>
            </template>
          </v-list>
        </v-sheet>
      </v-flex>
    </v-layout>

    <v-dialog v-model="chatOpened"
              max-width="420px">
      <Chat v-if="chatOpened" :interlocutor="interlocutor"></Chat>
    </v-dialog>
  </v-container>
</template>

<script>
  import Chat from '@/components/chat/Chat.vue';
  import { mapActions, mapState } from 'vuex';
  import { USERS_ONE_PAGE_LIMIT, Roles } from '@/common/constants';
  import _ from 'lodash';

  export default {
    components: {
      Chat
    },
    created() {
      const { limit, currentPage } = this;
      this.fetchUsers({ currentPage, limit });
      this.fetchRoleList();
    },
    data() {
      return {
        limit: USERS_ONE_PAGE_LIMIT,
        currentPage: parseInt(this.$route.query.page) || 1,
        chatOpened: false,
        interlocutor: null,
      }
    },
    watch: {
      currentPage: function(val) {
        this.$router.push({
          query: { page: val }
        });
      }
    },
    computed: {
      ...mapState('User', {
        availableRoles: state => state.availableRoles,
        users: state => state.users,
        usersCount: state => state.usersCount
      }),
      ...mapState('Auth', {
        isAdmin: state => state.me.Role.name === Roles.ADMIN
      }),
      noUsers: function() {
        return _.isEmpty(this.users);
      },
      pageCount: function() {
        let pageCount = (this.usersCount / this.limit);
        if (pageCount > parseInt(pageCount)) {
          pageCount = parseInt(pageCount) + 1;
        }
        return pageCount || 1;
      }
    },
    methods: {
      ...mapActions('User', [
        'fetchRoleList',
        'fetchUsers',
        'updateUserRole'
      ]),
      async onRoleChanged(role, user) {
        if(user.Role.name === role.name) {
          return;
        }

        const confirm = await this.$root.$confirmDialog(
          'Confirm changes',
          `Do you want to change role for this user from [${user.Role.name}] to [${role.name}]?`
        );
        if (confirm) {
          await this.updateUserRole({ role, id: user.id })
        }
      },
      openChat(user) {
        this.chatOpened = !this.chatOpened;
        this.interlocutor = user;
      },
      openOrderList(user) {
        this.$router.push({
          name: 'review_order',
          params: { userId: user.id }
        })
      }
    }
  }
</script>
