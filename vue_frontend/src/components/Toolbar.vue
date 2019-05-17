<template>
  <div>
    <v-toolbar class="toolbar">
      <v-toolbar-items>
        <v-btn flat>
          <v-img :src="logo"></v-img>
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-btn :to="{ name: 'sign_in' }" exact flat>Sign in</v-btn>
        <v-btn :to="{ name: 'sign_up' }" flat>Sign up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { FileResources } from '@/common/constants'

  export default {
    data() {
      return {
        logo: FileResources.logo
      }
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
