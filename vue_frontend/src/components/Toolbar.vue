<template>
  <div>
    <v-toolbar class="toolbar">
      <v-toolbar-items>
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <template v-if="!authorized">
          <v-btn :to="{ name: 'sign_in' }" exact flat>Sign in</v-btn>
          <v-btn :to="{ name: 'sign_up' }" flat>Sign up</v-btn>
        </template>
        <template v-else>
          <v-btn :to="{ name: 'shop' }" flat>Shop</v-btn>
          <v-btn :to="{ name: 'builder' }" flat>Product Builder</v-btn>
          <v-btn @click="signOut">Sign out</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: {
      authorized: Boolean
    },
    methods: {
      ...mapActions({
        signOutAction: 'Auth/signOut'
      }),
      signOut() {
        this.signOutAction()
          .then(() => this.$router.push('/'));
      }
    }
  }
</script>
<!--
<style lang="scss">
  @import url('~@/assets/scss/components/Toolbar.scss');
</style>-->
