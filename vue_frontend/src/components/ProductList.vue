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
                    <v-img :src="product.previewPhoto | imagePath"
                           height="200">
                      <v-expand-transition>
                        <div v-if="hover"
                             style="height: 100%;"
                             class="d-flex transition-fast-in-fast-out outcomeMessage darken-2 v-card--reveal display-1 white--text">
                          ${{product.price}}
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
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    created() {
      this.fetchProducts();
    },
    computed: {
      ...mapState('Product', {
        products: state => state.products.rows
      })
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
