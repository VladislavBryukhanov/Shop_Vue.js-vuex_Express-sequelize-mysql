<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-toolbar-items>
        <v-btn :to="{ name: 'sign_in' }" flat>Sign in</v-btn>
        <v-btn :to="{ name: 'sign_up' }" flat>Sign up</v-btn>
        <v-btn :to="{ name: 'shop' }" flat>Shop</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>
