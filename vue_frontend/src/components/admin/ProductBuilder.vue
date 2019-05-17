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
          <v-form @submit.prevent="addProduct"
                  ref="productBuilder">
            <v-container>
              <v-hover>
                <v-card slot-scope="{ hover }"
                        light
                        :aspect-ratio="16/9"
                        :class="`elevation-${hover ? 10 : 2}`">
                  <v-container>
                    <label for="attachPhoto">
                      <v-img :src="photoPreview"
                             contain>
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
              <v-text-field v-model="product.name"
                            label="Product name"
                            counter="64"
                            :rules="validationRules.name"/>
              <v-text-field v-model="product.description"
                            label="Description"
                            counter="512"
                            :rules="validationRules.description"/>
              <v-text-field v-model="product.price"
                            type="number"
                            label="Price"
                            :rules="validationRules.price"/>
              <v-select v-model="product.CategoryId"
                        item-text="name"
                        item-value="id"
                        :items="categories"
                        :rules="validationRules.category"/>
              <v-btn type="submit">
                Save
              </v-btn>
            </v-container>
          </v-form>
        </v-sheet>

        <v-dialog v-model="dialogShowed"
                  max-width="350">
          <v-card>
            <v-card-title class="headline">
              File maximal size exceeded
            </v-card-title>
            <v-card-text>
              Maximum image size is 5MB. You have exceeded this restriction.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialogShowed = !dialogShowed"
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

    computed: {
      ...mapState('Product', {
        categories: state => state.categories.rows
      })
    },

    data() {
      return {
        product: {
          CategoryId: null,
          attachedPhoto: null,
          name: '',
          description: '',
          price: 0,
        },
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
        photoPreview: FileResources.defaultPreview,
      }
    },
    methods: {
      ...mapActions('Product', {
        addProductAction: 'addProduct',
      }),
      onPhotoChange(e) {
        const [ attachedPhoto ] = e.target.files;
        if (attachedPhoto.size > FileResources.IMAGE_MAX_SIZE) {
          this.dialogShowed = !this.dialogShowed;
          return;
        }

        this.product.attachedPhoto = attachedPhoto;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.photoPreview = fileReader.result;
        };
        fileReader.readAsDataURL(attachedPhoto);
      },
      addProduct() {
        if (this.$refs.productBuilder.validate()) {
          this.product.price = Number(this.product.price);
          const product = new FormData();
          _.each(this.product, (value, key) => {
            product.append(key, value);
          });
          this.addProductAction(product)
            .then(() => this.$router.go(-1));
        }
      }
    }
  }
</script>

<style>
  @import "../../assets/scss/components/ProductBuilder.scss";
</style>
