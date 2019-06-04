<template>
  <v-container>
    <v-layout>
      <v-flex sm10 offset-sm1>
        <v-sheet elevation="6">
          <v-list>
            <v-flex v-if="noOrders">
              <v-container>
                <h3 class="display-1 font-weight-light primary--text">No active orders found</h3>
              </v-container>
            </v-flex>

            <template v-for="order in orders">
              <v-divider>
              </v-divider>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Ordered {{order.products.length}} products</v-list-tile-title>
                  <v-list-tile-sub-title>Total cost is {{getTotalCost(order) | price('USD')}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{order.createdAt | dateFormat}}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </template>

          </v-list>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState('Categories')
    }
    methods: {
      ...mapActions('Categories', [

      ])
    }
  }
</script>
