<template>
  <v-container>
    <v-layout>
      <v-flex sm10 offset-sm1>
        <v-sheet elevation="6">
          <v-layout row wrap>
            <v-flex v-for="product in products">
              <v-container>
                <v-hover>
                  <v-card elevation="6"
                          slot-scope="{ hover }"
                          width="250"
                          light
                          class="product">
                    <v-img :src="product.previewPhoto | imagePath('preview_photo')"
                           height="200">
                      <v-expand-transition>
                        <div v-if="hover"
                             style="height: 100%;"
                             class="d-flex transition-fast-in-fast-out outcomeMessage darken-2 v-card--reveal display-1 white--text">
                          {{product.price | price('USD')}}
                        </div>
                      </v-expand-transition>
                    </v-img>

                    <v-card-title primary-title
                                  style="position: relative;">
                      <v-btn
                          absolute
                          dark
                          color="outcomeMessage"
                          fab
                          right
                          top>
                        <v-icon>shopping_cart</v-icon>
                      </v-btn>
                      <h3 class="display-1 font-weight-light primary--text">
                        {{product.name}}
                      </h3>
                    </v-card-title>

                    <v-card-text>
                      {{product.description}}
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-container>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
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
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { PRODUCTS_ONE_PAGE_LIMIT } from '@/common/constants';

  export default {
    created() {
      const { limit, currentPage } = this;
      const offset = (currentPage - 1) * limit;

      this.fetchProducts({ offset, limit });
    },
    beforeRouteUpdate(to, from, next) {
      const { limit } = this;
      const offset = limit * (to.query.page - 1);

      this.fetchProducts({ offset, limit });
      next();
    },
    watch: {
      currentPage: function(val) {
        this.$router.push(`/products?page=${val}`);
      }
    },
    computed: {
      ...mapState('Product', {
        products: state => state.products.rows,
        productsCount: state => state.products.count
      }),
      pageCount: function() {
        let pageCount = (this.productsCount / this.limit);
        if (pageCount > parseInt(pageCount)) {
          pageCount = parseInt(pageCount) + 1;
        }
        return pageCount || 1;
      },
    },
    data() {
      return {
        limit: PRODUCTS_ONE_PAGE_LIMIT,
        currentPage: parseInt(this.$route.query.page) || 1
      }
    },
    methods: {
      ...mapActions('Product', [
        'fetchProducts'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/components/ProductList';
</style>
