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

        <v-list-tile :to="{ name: 'products' }">
          <v-list-tile-action>
            <v-icon>grade</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Top popular</v-list-tile-title>
        </v-list-tile>

        <v-list-group prepend-icon="dashboard"
                      @click="selectGroup(groups.CATEGORIES)"
                      :value="openedGroup === groups.CATEGORIES && !minNavDraw"
                      no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Categories</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile v-for="category in categories">
            <v-list-tile-title>{{category.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group prepend-icon="settings_applications"
                      @click="selectGroup(groups.ADMIN)"
                      :value="openedGroup === groups.ADMIN && !minNavDraw"
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
        </v-list-group>

        <v-list-tile :to="{ name: 'shopping_cart' }">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Shopping cart</v-list-tile-title>
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
          <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { FileResources } from '@/common/constants';

  export default {

    created() {
      // TODO select to infinity select component
      // this.fetchCategories({ page: 0, limit: 100 });
      this.fetchCategories();
    },

    computed: {
      ...mapState('Product', {
        categories: state => state.categories.rows
      }),
    },

    data() {
      return {
        groups: {
          CATEGORIES: 'CATEGORIES',
          ADMIN: 'ADMIN',
        },
        openedGroup: '',
        minNavDraw: true,
        logo: FileResources.logo
      }
    },
    methods: {
      ...mapActions({
        fetchCategories: 'Product/fetchCategories',
        signOutAction: 'Auth/signOut',
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
