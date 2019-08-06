<template>
  <v-container>
    <v-layout>
      <v-flex sm8 offset-sm2>
        <v-sheet elevation="6">
          <v-list>
            <v-flex v-if="noCategories">
              <v-container>
                <h3 class="display-1 font-weight-light primary--text">No active categories found</h3>
              </v-container>
            </v-flex>
            <v-text-field v-model="category"
                          color="actionColor"
                          solo light
                          append-icon="done_outline"
                          @click:append="createCategory"
                          label="Input new category">
            </v-text-field>

            <template v-for="category in categories">
              <v-divider>
              </v-divider>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{category.name}}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn flat color="removingColor" @click="removeCategory(category)">
                    <v-icon>close</v-icon>
                  </v-btn>
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
  import { mapState, mapActions, mapMutations } from 'vuex';
  import _ from 'lodash';

  export default {
    data() {
      return {
        category: '',
      }
    },
    computed: {
      ...mapState('Category', {
        categories: state => state.categories
      }),
      noCategories: function() {
        return _.isEmpty(this.categories);
      }
    },
    methods: {
      ...mapActions('Category', {
        createCategoryAction: 'createCategory',
        removeCategoryAction: 'removeCategory'
      }),
      ...mapMutations('Common', [
        'showSnackbar'
      ]),
      validateCategory(category) {
        if (category.length >= 1 && category.length <= 32) {
          return true;
        }

        this.showSnackbar({
          message: 'Category must be longer then 1 and less then 32 characters!',
          duration: 5000
        });
      },
      async createCategory() {
        const { category } = this;

        if (!this.validateCategory(category)) {
          return;
        }

        const confirm = await this.$root.$confirmDialog(
          'Are you sure?',
          `Do you want create category "${category}"?`
        );
        if (confirm) {
          await this.createCategoryAction(category);
          this.category = '';
        }
      },
      async removeCategory(category) {
        const confirm = await this.$root.$confirmDialog(
          'Are you sure?',
          `Do you want delete category "${category.name}" with all attached products?`
        );
        if (confirm) {
          await this.removeCategoryAction(category.id);
        }
      }
    }
  }
</script>
