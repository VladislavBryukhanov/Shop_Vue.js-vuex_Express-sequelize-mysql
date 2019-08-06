<template>
  <v-container>
    <v-layout>
      <v-flex class="text-xs-center"
              xl4 offset-xl4
              lg6 offset-lg3
              md8 offset-md2
              sm10 offset-sm1
              sx12>
        <v-sheet elevation="6">
          <v-toolbar flat light>
            <v-btn icon @click="navBack">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="font-weight-light actionColor--text">Product builder</v-toolbar-title>
          </v-toolbar>

          <v-form @submit.prevent="saveProduct"
                  ref="productBuilder">
            <v-container>
              <v-layout wrap
                        justify-space-between>
                <v-flex row md6
                        sm6 offset-sm0
                        xs10 offset-xs1>
                  <v-hover>
                    <v-card slot-scope="{ hover }"
                            light
                            :class="`elevation-${hover ? 10 : 2}`">
                      <v-container>
                        <label for="attachPhoto">
                          <v-img :src="photoPreview"
                                 height="200">
                          </v-img>
                        </label>
                        <input type="file"
                               id="attachPhoto"
                               class="attachPhoto"
                               accept="image/*"
                               @change="onPhotoChange"/>
                      </v-container>
                    </v-card>
                  </v-hover>
                </v-flex>
                <v-flex row md6
                        sm6 offset-sm0
                        xs10 offset-xs1>
                  <v-text-field v-model="product.name"
                                label="Product name"
                                counter="64"
                                :rules="validationRules.name"/>
                  <v-text-field v-model="product.price"
                                type="number"
                                label="Price"
                                :rules="validationRules.price"/>
                  <v-select v-model="product.CategoryId"
                            item-text="name"
                            item-value="id"
                            label="Category"
                            :items="categories"
                            :rules="validationRules.CategoryId"/>
                </v-flex>
              </v-layout>
              <v-textarea v-model="product.description"
                          auto-grow
                          outline
                          label="Description"
                          counter="512"
                          :rules="validationRules.description"/>
              <v-btn type="submit" block>
                Save
              </v-btn>
            </v-container>
          </v-form>
        </v-sheet>

        <v-dialog v-model="dialogShowed"
                  width="350">
          <v-card light>
            <v-card-title class="headline">
              File maximal size exceeded
            </v-card-title>
            <v-card-text>
              Maximum image size is 5MB. You have exceeded this restriction.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialogShowed = !dialogShowed"
                     color="actionColor"
                     flat>
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { FileResources } from '@/common/constants'
  import { mapActions, mapState } from 'vuex';
  import _ from 'lodash';

  export default {
    props: {
      editableProduct: Object
    },
    created() {
      const { editableProduct } = this;

      if (editableProduct) {
        const { previewPhoto } = editableProduct;

        if (previewPhoto) {
          this.photoPreview = this.$options.filters.imagePath(previewPhoto, 'preview_photo', 'thumbnail');
        }

        this.product = editableProduct;
      }
    },
    computed: {
      ...mapState('Category', {
        categories: state => state.categories
      })
    },
    data() {
      return {
        validationRules: {
          name: [
            (v) => !!v || 'Name is required',
            (v) => (v.length >= 1 && v.length <= 64) || 'Name must be longer then 1 and less then 64 characters!',
          ],
          description: [
            (v) => !!v || 'Description is required',
            (v) => (v.length >= 1 && v.length <= 512) || 'Description must be longer then 1 and less then 512 characters!',
          ],
          price: [
            (v) => (!!v && v != 0) || 'Price is required',
            (v) => (v > 0) || 'The price can not be less than 0',
          ],
          CategoryId: [
            (v) => !!v || 'Category is required',
          ]
        },
        dialogShowed: false,
        product: {
          CategoryId: null,
          attachedPhoto: null,
          name: '',
          description: '',
          price: '',
        },
        photoPreview: FileResources.defaultPreview,
      }
    },
    methods: {
      ...mapActions('Product', {
        createProductAction: 'createProduct',
        updateProductAction: 'updateProduct'
      }),
      navBack() {
        this.$router.go(-1);
      },
      onPhotoChange(e) {
        const [ attachedPhoto ] = e.target.files;

        if (attachedPhoto.size > FileResources.IMAGE_MAX_SIZE) {
          this.dialogShowed = !this.dialogShowed;
          return;
        }

        const fileReader = new FileReader();
        this.product.attachedPhoto = attachedPhoto;

        fileReader.onload = () => {
          this.photoPreview = fileReader.result;
        };
        fileReader.readAsDataURL(attachedPhoto);
      },
      saveProduct() {
        const { product } = this;
        const productForm = new FormData();
        product.price = Number(product.price);
        let action;

        if (!this.$refs.productBuilder.validate()) {
          return;
        }

        _.each(product, (value, key) => {
          if (value) {
            productForm.append(key, value);
          }
        });

        if (this.editableProduct) {
          action = this.updateProductAction(productForm)
        } else {
          action = this.createProductAction(productForm)
        }
        action.then(() => this.$router.go(-1));
      },
    }
  }
</script>

<style>
  @import "../../assets/scss/components/ProductBuilder.scss";
</style>
