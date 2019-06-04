<template>
  <div>
    <v-navigation-drawer
      app permanent
      :mini-variant.sync="minNavDraw">
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-img :src="logo"/>
          </v-list-tile-avatar>
          <v-list-tile-title>Shop</v-list-tile-title>
          <v-list-tile-action v-if="!minNavDraw">
            <v-btn icon @click.stop="minNavDraw = !minNavDraw">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile :to="{ name: 'top_products' }"
                     @click.stop>
          <v-list-tile-action>
            <v-icon>grade</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Top popular</v-list-tile-title>
        </v-list-tile>

        <v-list-group prepend-icon="dashboard"
                      @click="selectGroup(groups.CATEGORIES)"
                      :value="!minNavDraw && openedGroup === groups.CATEGORIES"
                      no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Categories</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile v-for="category in categories"
                       :to="{ name: 'products', params: { category: category.name } }">
            <v-list-tile-title>{{category.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group v-if="!isMeUser"
                      @click="selectGroup(groups.ADMIN)"
                      :value="!minNavDraw && openedGroup === groups.ADMIN"
                      prepend-icon="settings_applications"
                      no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile :to="{ name: 'builder' }">
            <v-list-tile-title>Create product</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile :to="{ name: 'builder' }">
            <v-list-tile-title>Manage categories</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>add_to_photos</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile :to="{ name: 'users' }">
            <v-list-tile-title>Users</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>people</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <!--TODO Admin and User to separate tab - Admin without order and chat buttons, role only-->
          <!--<v-list-tile :to="{ name: 'users' }">-->
            <!--<v-list-tile-title>Managers</v-list-tile-title>-->
            <!--<v-list-tile-action>-->
              <!--<v-icon>work</v-icon>-->
            <!--</v-list-tile-action>-->
          <!--</v-list-tile>-->

        </v-list-group>

        <v-list-tile :to="{ name: 'shopping_cart' }"
                     @click.stop>
          <v-list-tile-action>
            <v-badge color="removingColor">
              <template v-slot:badge
                        v-if="productsCount">
                <span class="font-weight-bold">{{productsCount}}</span>
              </template>
              <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-list-tile-action>
          <v-list-tile-title>Shopping cart</v-list-tile-title>
        </v-list-tile>

        <v-list-tile :to="{ name: 'orders' }" @click.stop>
          <v-list-tile-action>
            <v-icon>list_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Orders list
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click.stop="signOut">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Sign out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
          <router-view :key="$route.fullPath"></router-view>
    </v-content>

    <template v-if="isMeUser">
      <v-btn color="actionColor"
             @click="chatOpened = !chatOpened"
             dark fixed bottom right fab>
        <v-icon>chat</v-icon>
      </v-btn>
      <v-dialog v-model="chatOpened"
                max-width="420px">
        <Chat v-if="chatOpened"></Chat>
      </v-dialog>
    </template>

  </div>
</template>

<script>
  // FIXME separate NavBar and Chat

  import Chat from '@/components/chat/Chat.vue';
  import { mapActions, mapState } from 'vuex';
  import { FileResources, Roles } from '@/common/constants';

  export default {
    components: {
      Chat
    },
    created() {
      // TODO select to infinity select component
      // this.fetchCategories({ page: 0, limit: 100 });
      this.fetchCategories();
      this.fetchShoppingCart();
    },

    computed: {
      ...mapState({
        categories: state => state.Product.categories.rows,
        productsCount: state => state.Cart.productsCount,
        me: state => state.Auth.me
      }),
      isMeUser: function() {
        return this.me.Role.name === Roles.USER;
      }
    },

    data() {
      return {
        groups: {
          CATEGORIES: 'CATEGORIES',
          ADMIN: 'ADMIN',
        },
        openedGroup: '',
        minNavDraw: true,
        logo: FileResources.logo,
        chatOpened: false
      }
    },
    methods: {
      ...mapActions({
        fetchShoppingCart: 'Cart/fetchShoppingCart',
        fetchCategories: 'Product/fetchCategories',
        signOutAction: 'Auth/signOut'
      }),
      selectGroup(group) {
        this.openedGroup = this.openedGroup === group ? '' : group;
      },
      signOut() {
        this.signOutAction()
          .then(() => this.$router.push('/'));
      }
    }
  }
</script>
