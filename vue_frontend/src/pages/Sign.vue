<template>
  <v-flex xl4 offset-xl4 lg4 offset-lg4 md6 offset-md3 sm8 offset-sm2 sx10 offset-sx-1>
    <v-sheet elevation="6">
      <form @submit.prevent="signUp"
            v-if="isSignUp">
        <v-text-field v-model="user.username"
                      :counter="20"
                      label="Username"
                      :rules="validationRules.username"/>
        <v-text-field v-model="user.login"
                      :counter="20"
                      label="Login"
                      :rules="validationRules.login"/>
        <v-text-field v-model="user.password"
                      :counter="20"
                      label="Password"
                      :rules="validationRules.password"/>
        <v-btn type="submit">
          Sign up
        </v-btn>
      </form>
      <v-form @submit.prevent="signIn"
              v-else>
        <v-text-field v-model="user.login"
                      :counter="20"
                      label="Login"
                      :rules="validationRules.login"/>
        <v-text-field v-model="user.password"
                      :counter="20"
                      label="Password"
                      :rules="validationRules.password"/>
        <v-btn type="submit">
          Sign in
        </v-btn>
        <v-btn :to="{ name: 'sign_up' }" flat>
          Sign up
        </v-btn>
      </v-form>
    </v-sheet>
  </v-flex>
</template>

<script>
  import Vue from 'vue';
  import { mapActions } from 'vuex';

  export default {
    props: {
      isSignUp: Boolean,
    },

    data() {
      return {
        validationRules: {
          username: [
            (v) => !!v || 'Username is required field!',
            (v) => (v.length >= 1 && v.length <= 20) || 'Username must be longer then 3 and less then 20 characters!',
          ],
          login: [
            (v) => !!v || 'Login is required field!',
            (v) => (v.length >= 4 && v.length <= 20) || 'Login must be longer then 3 and less then 20 characters!',
          ],
          password: [
            (v) => !!v || 'Password is required field!',
            (v) => (v.length >= 8 && v.length <= 20) || 'Password must be longer then 3 and less then 20 characters!',
          ],
        },
        user: {
          username: '',
          login: '',
          password: '',
        },
      };
    },

    methods: {
      ...mapActions('Auth', [
        'signIn',
        'signUp',
      ])
    }
  }
</script>
