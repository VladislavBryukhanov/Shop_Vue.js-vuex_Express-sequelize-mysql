<template>
  <v-container>
    <div class="text-xs-center">
      <v-container>
        <v-layout justify-center>
          <v-flex xl4 lg6 md8 sm10 xs12>
            <v-card>
              <v-card-text>
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
          <v-card light>
            <v-card-title>
              <h3 class="display-1 font-weight-light actionColor--text">
                Total cost: {{totalCost | price('USD')}}
              </h3>
              <v-spacer></v-spacer>
              <v-btn v-if="!noProducts"
                     flat
                     color="removingColor">
                Buy this products
              </v-btn>
            </v-card-title>
          </v-card>

          <v-layout row wrap>
            <v-flex v-if="noProducts">
              <v-container>
                <h3 class="display-1 font-weight-light primary--text">No products in shopping cart</h3>
              </v-container>
            </v-flex>

            <v-flex v-for="product in products">
              <v-container>
                <v-card elevation="6"
                        width="250"
                        light
                        class="product">
                  <v-img :src="product.previewPhoto | imagePath('preview_photo', 'thumbnail')"
                         height="200">
                  </v-img>

                  <v-card-title primary-title
                                style="position: relative;">

                    <v-btn
                      @click="excludeCartProduct(product.id)"
                      absolute
                      dark
                      color="removingColor"
                      fab
                      left
                      top>
                      <v-icon>close</v-icon>
                    </v-btn>

                    <v-btn
                      @click="createContract(product)"
                      absolute
                      dark
                      color="actionColor"
                      fab
                      right
                      top>
                      <v-icon>attach_money</v-icon>
                    </v-btn>

                    <h3 class="display-1 font-weight-light primary--text">
                      {{product.name}}
                    </h3>
                  </v-card-title>

                  <v-card-text>
                    <h3 class="actionColor--text">
                      {{product.price | price('USD')}}
                    </h3>
                  </v-card-text>

                  <v-card-text>
                    {{product.description}}
                  </v-card-text>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import { mapState, mapActions } from 'vuex';
  import { CART_ONE_PAGE_LIMIT } from '@/common/constants';
  import _ from 'lodash';

  export default {
    created() {
      const { limit, currentPage } = this;
      this.fetchCartProducts({ currentPage, limit });
    },
    beforeRouteUpdate(to, from, next) {
      const { limit } = this;

      this.fetchCartProducts({ currentPage: to.query.page, limit });
      next();
    },
    watch: {
      currentPage: function(val) {
        this.$router.push({
          name: 'shopping_cart',
          query: { page: val }
        });
      }
    },
    computed: {
      ...mapState('Cart', {
        products: state => state.products,
        productsCount: state => state.productsCount,
        totalCost: state => state.totalCost
      }),
      pageCount: function() {
        let pageCount = (this.productsCount / this.limit);
        if (pageCount > parseInt(pageCount)) {
          pageCount = parseInt(pageCount) + 1;
        }
        return pageCount || 1;
      },
      noProducts: function() {
        return _.isEmpty(this.products);
      }
    },
    data() {
      return {
        limit: CART_ONE_PAGE_LIMIT,
        currentPage: parseInt(this.$route.query.page) || 1
      }
    },
    methods: {
      ...mapActions('Cart', [
        'fetchCartProducts',
        'excludeCartProduct',
      ]),
      createContract(product) {
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/components/ShoppingCart';
</style>
