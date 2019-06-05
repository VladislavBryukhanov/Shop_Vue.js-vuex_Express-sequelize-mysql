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

              <v-list-group :key="order.id">
                <template v-slot:activator>
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

                <template v-for="product in order.products">
                  <v-divider>
                  </v-divider>

                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-img :src="product.previewPhoto | imagePath('preview_photo', 'thumbnail')">
                      </v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{product.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>Category: {{product.Category.name}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{product.price | price('USD')}}</v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>

                <v-list-tile>
                  <v-layout justify-center>
                    <v-btn @click="closeOrder(order)" block flat class="font-weight-black"
                           color="removingColor">Close</v-btn>
                  </v-layout>
                </v-list-tile>
              </v-list-group>
            </template>
          </v-list>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  // import { ORDER_ONE_PAGE_LIMIT } from '@/common/constants';
  import _ from 'lodash';

  export default {
    created() {
      const { userId } = this;

      if (userId) {
        return this.fetchUsersOrder(userId);
      }

      this.fetchPersonalOrders();
      // this.fetchOrders({ currentPage: 1, limit: 10 });
    },
    data() {
      return {
        userId: this.$route.params.userId
      }
    },
    computed: {
      ...mapState('Order', {
        orders: state => state.orders
      }),
      noOrders: function() {
        return _.isEmpty(this.orders);
      }
    },
    methods: {
      ...mapActions('Order', [
        'fetchUsersOrder',
        'fetchPersonalOrders',
        'declineOrder'
      ]),
      getTotalCost: function(order) {
        let totalCost = 0;
        order.products.forEach(product => {
          totalCost+= product.price;
        });
        return totalCost;
      },
      async closeOrder(order) {
        const confirm = await this.$root.$confirmDialog(
          `Confirm order closing`,
          `Do you want to close this order with ${order.products.length} product(s)?`
        );

        if (confirm) {
          this.declineOrder(order.id);
        }
      }
    }
  }
</script>
