<template>
  <v-container class="sign" fill-height>
    <v-layout row wrap align-center>
      <v-flex v-if="isSignUp"
              class="text-xs-center"
              xl4 offset-xl4
              lg4 offset-lg4
              md6 offset-md3
              sm8 offset-sm2
              sx10 offset-sx-1>
        <v-sheet elevation="6">
          <v-toolbar flat light>
            <v-btn icon @click="navBack">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="font-weight-light actionColor--text">Sign up</v-toolbar-title>
          </v-toolbar>

          <v-form @submit.prevent="signUp"
                  ref="signUpForm">
            <v-container>
              <v-layout
                wrap
                justify-space-between>
                <v-flex md6 row>
                  <v-text-field v-model="user.email"
                                label="Email"
                                :rules="validationRules.email"/>
                  <v-text-field v-model="user.password"
                                :counter="32"
                                type="password"
                                label="Password"
                                :rules="validationRules.password"/>
                  <v-select v-model="user.gender"
                            :items="genderList"
                            item-text="name"
                            item-value="value"
                            label="Gender"/>
                </v-flex>

                <v-flex md6 row>
                  <v-text-field v-model="user.firstName"
                                :counter="20"
                                label="First name"
                                :rules="validationRules.firstName"/>
                  <v-text-field v-model="user.lastName"
                                :counter="20"
                                label="Last name"
                                :rules="validationRules.lastName"/>
                  <!--            <v-date-picker v-model="birthDay"></v-date-picker>-->
                  <!--FIXME validate datepicker and set min date-->
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :return-value.sync="user.birthDay"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width>
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="user.birthDay"
                        label="Birthday"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="user.birthDay" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(user.birthDay)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>

              <v-subheader>Contact info</v-subheader>

              <v-text-field v-model="contactInfo.phone"
                            type="number"
                            label="Phone"
                            :rules="validationRules.phone"
                            :counter="12"/>

              <v-text-field v-model="contactInfo.address"
                            label="Address"
                            :rules="validationRules.address"
                            :counter="64"/>
              <v-btn block
                     type="submit">
                Sign up
              </v-btn>
            </v-container>
          </v-form>
        </v-sheet>
      </v-flex>

      <v-flex v-else
              xl4 offset-xl4
              lg4 offset-lg4
              md4 offset-md4
              sm6 offset-sm3
              sx8 offset-sx-2>
        <v-sheet elevation="6">
          <v-toolbar flat light>
            <v-toolbar-title class="font-weight-light actionColor--text">Sign in</v-toolbar-title>
          </v-toolbar>

          <v-container>
            <v-form @submit.prevent="signIn"
                    ref="signInForm">
              <v-text-field v-model="user.email"
                            label="Email"/>
              <v-text-field v-model="user.password"
                            type="password"
                            label="Password"/>
              <v-btn type="submit">
                Sign in
              </v-btn>
              <v-btn :to="{ name: 'sign_up' }" flat>
                Sign up
              </v-btn>
            </v-form>
          </v-container>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import moment from 'moment';
  import _ from 'lodash';

  export default {
    props: {
      isSignUp: Boolean,
    },

    data() {
      return {
        user: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          gender: null,
          birthDay: null,
        },
        contactInfo: {
          phone: '',
          address: '',
        },
        validationRules: {
          email: [
            v => !!v || 'E-mail is required',
            v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            (v) => !!v || 'Password is required field!',
            (v) => (v.length >= 8 && v.length <= 32) || 'Password must be longer then 8 and less then 32 characters!',
          ],
          firstName: [
            (v) => !!v || 'First name is required field!',
            (v) => (v.length >= 1 && v.length <= 20) || 'First name must be longer then 1 and less then 20 characters!',
          ],
          lastName: [
            (v) => !!v || 'Last name is required field!',
            (v) => (v.length >= 1 && v.length <= 20) || 'Last name must be longer then 1 and less then 20 characters!',
          ],

          phone: [
            (v) => !!v || 'Phone is required field!',
            (v) => (v.length >= 4 && v.length <= 12) || 'Please enter a valid phone number'
          ],
          address: [
            (v) => !!v || 'Address is required field!',
            (v) => (v.length >= 4 && v.length <= 64) || 'Please enter a valid address'
          ]
        },
        genderList: [
          {
            name: 'Male',
            value: true,
          },
          {
            name: 'Female',
            value: false,
          },
        ],
        menu: false,
      };
    },

    methods: {
      ...mapActions('Auth', {
        signInActions: 'signIn',
        signUpActions: 'signUp',
      }),
      navBack() {
        this.$router.push({name: 'sign_in'});
      },
      signIn() {
        if (this.$refs.signInForm.validate()) {
          const user = _.omitBy(this.user, _.isNil);
          this.signInActions(user)
            .then(() => this.$router.push('top_products'));
        }
      },
      signUp() {
        if (this.$refs.signUpForm.validate()) {
          const contactInfo = _.omitBy(this.contactInfo, _.isNil);
          const user = _.omitBy(this.user, _.isNil);
          user.birthDay = moment(user.birthDay).unix();

          this.signUpActions({
            user,
            contactInfo,
          }).then(() =>
            this.$router.push('top_products'));
        }
      }
    }
  }
</script>
