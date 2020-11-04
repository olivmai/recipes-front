<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Nouvel ingrédient</md-dialog-title>

            <md-content>
                <div class="md-layout md-gutter md-alignment-space-between ingredient-form-container">
                <div class="md-layout-item">
                    <md-field md-inline>
                    <label>Nom</label>
                    <md-input v-model="ingredient.name"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field md-inline>
                    <label>Quanité</label>
                    <md-input v-model="ingredient.quantity"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field md-inline>
                    <label>Unité</label>
                    <md-input v-model="ingredient.unity"></md-input>
                    </md-field>
                </div>
                </div>
            </md-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-raised md-primary" @click="addIngredient()">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'IngredientDialogForm',
  data () {
      return {
          showDialog: this.$props.show
      }
  },
  props: {
      show: Boolean,
      ingredient: Object
  },
  mounted () {
      this.showDialog = false
  },
  methods: {
    hideDialog() {
        this.showDialog = false
    },
    addIngredient() {
        var recipeId = this.$route.params.id
        var toasted = this.$toasted
        let self = this

        self.ingredient.recipeId = "/api/recipes/" + recipeId
        var quantity = ("" === self.ingredient.quantity) ? 0 : parseInt(self.ingredient.quantity)

        axios
        .post('https://127.0.0.1:8000/api/ingredients', {
            name: self.ingredient.name,
            quantity: quantity,
            unity: self.ingredient.unity,
            recipe: self.ingredient.recipeId
        })
        .then(response => (self.updateIngredients(response.data)))
        .catch(error => {
            if (undefined !== error.response) {
            toasted.error(error.response.data["hydra:description"], {
                icon: 'report_problem',
                duration: 5000
            })
            }
        })
        .finally(function () {
            self.hideDialog()
        })
    },
    updateIngredients(ingredient) {
        this.ingredients.push(ingredient)
    }
  }
}
</script>

<style scoped>
  .ingredient-form-container {
    padding: 25px;
  }
</style>