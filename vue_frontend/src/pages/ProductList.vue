<template>
  <v-container>
    <div class="text-xs-center">
      <v-container>
        <v-layout justify-center>
          <v-flex xl4 lg6 md8 sm10 xs12>
            <v-card>
              <v-card-text>
                <v-text-field v-model="query.searchQuery"
                              @input="searchFilter"
                              clearable solo light
                              prepend-inner-icon="search"
                              label="Filter by name">
                </v-text-field>
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
          <v-layout row wrap>
            <v-flex v-if="!productsCount">
              <v-container>
                <h3 class="display-1 font-weight-light primary--text">No products found in this category</h3>
              </v-container>
            </v-flex>

            <v-flex v-for="product in products">
              <v-container>
                <v-hover>
                  <v-card elevation="6"
                          slot-scope="{ hover }"
                          width="250"
                          light
                          class="product">
                    <v-img :src="product.previewPhoto | imagePath('preview_photo', 'thumbnail')"
                           height="200">
                      <v-expand-transition>
                        <div v-if="hover"
                             style="height: 100%;"
                             class="d-flex transition-fast-in-fast-out actionColor darken-2 v-card--reveal display-1 white--text">
                          {{product.price | price('USD')}}
                        </div>
                      </v-expand-transition>
                    </v-img>

                    <v-card-title primary-title
                                  style="position: relative;">
                      <v-btn
                          v-if="!isInCart(product.id)"
                          @click="insertCartProduct(product.id)"
                          absolute
                          dark
                          color="actionColor"
                          fab
                          right
                          top>
                        <v-icon>shopping_cart</v-icon>
                      </v-btn>

                      <v-btn
                          v-else
                          @click="excludeCartProduct(product.id)"
                          absolute
                          dark
                          color="darkerGrey"
                          fab
                          right
                          top>
                        <v-icon>remove_shopping_cart</v-icon>
                      </v-btn>

                      <h3 class="display-1 font-weight-light primary--text">
                        {{product.name}}
                      </h3>
                    </v-card-title>

                    <v-card-text>
                      {{product.description}}
                    </v-card-text>

                    <v-btn
                      @click="deleteProduct(product)"
                      absolute
                      dark
                      color="removingColor"
                      fab
                      right
                      top>
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                    <v-btn
                      @click="editProduct(product)"
                      absolute
                      color="white"
                      fab
                      left
                      top>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-card>
                </v-hover>
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
  import { PRODUCTS_ONE_PAGE_LIMIT } from '@/common/constants';
  import _ from 'lodash';

  export default {
    // TODO PAGING TO COMMON COMPONENT

    created() {
      const { query, offset } = this;
      this.fetchProducts({ offset, ...query });
    },
    beforeRouteUpdate(to, from, next) {
      if (to.params.category !== from.params.category) {
        this.query.category = to.params.category;
        this.currentPage = 1;
        this.searchQuery = '';
      }

      const { query, offset } = this;
      this.fetchProducts({ offset, ...query });
      next();
    },
    data() {
      return {
        query: {
          limit: PRODUCTS_ONE_PAGE_LIMIT,
          category: this.$route.params.category,
          searchQuery: ''
        },
        currentPage: parseInt(this.$route.query.page) || 1
      }
    },
    watch: {
      currentPage: function(val) {
        this.$router.push({
          name: 'products',
          query: { page: val }
        });
      },
    },
    computed: {
      ...mapState('Product', {
        products: state => state.products.rows,
        productsCount: state => state.products.count
      }),
      ...mapState('Cart', {
        productIds: state => state.productIds
      }),
      pageCount: function() {
        let pageCount = (this.productsCount / this.query.limit);
        if (pageCount > parseInt(pageCount)) {
          pageCount = parseInt(pageCount) + 1;
        }
        return pageCount || 1;
      },
      offset: function() {
        return (this.currentPage - 1) * this.query.limit;
      }
    },
    methods: {
      ...mapActions('Product', [
        'fetchProducts',
        'deleteProductById',
      ]),
      ...mapActions('Cart', [
        'insertCartProduct',
        'excludeCartProduct',
      ]),
      searchFilter: _.debounce(function () {
        this.fetchProducts({ offset: 0, ...this.query });
      }, 300),
      async deleteProduct(product) {
        const { name, id } = product;

        const confirm = await this.$root.$confirmDialog(
          'Are you sure?',
          `Do you want remove this product "${name}"?`
        );

        if (confirm) {
          await this.deleteProductById(id);

          const { query, offset } = this;
          this.fetchProducts({ offset, ...query });
        }
      },
      editProduct(product) {
        this.$router.push({
          name: 'builder',
          params: { editableProduct: product }
        })
      },
      isInCart(prodId) {
        return this.productIds.includes(prodId);
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/components/ProductList';
</style>
