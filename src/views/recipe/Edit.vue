<template>
  <div class="new">
    <!-- Dialog to confirm recipe deletion -->
      <md-dialog-confirm
      :md-active.sync="active"
      md-title="Remove ingredient"
      md-content="Do you really want to delete this ingredient ?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Nouvel ingrédient</md-dialog-title>
        <md-content>
            <IngredientForm :ingredient="ingredient" />
        </md-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Fermer</md-button>
            <md-button class="md-raised md-primary" @click="addIngredient()">Enregistrer</md-button>
        </md-dialog-actions>
    </md-dialog>
    <md-card>
      <md-card-header>
        <div class="md-title">{{recipe.name}}</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Nom de la recette</label>
              <md-input v-model="recipe.name">recipe.name</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-15 md-small-size-100 recipe-update-button">
            <md-button class="md-raised md-primary" v-on:click="save()">Modifier</md-button>
          </div>
        </div>
        <h3>Ingredients</h3>
        <md-list>
          <md-list>
            <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                  <Ingredient
                  :name="ingredient.name" :quantity="ingredient.quantity" :unity="ingredient.unity" />
                </div>
                <div class="md-layout-item">
                  <md-button class="md-icon-button md-accent" v-on:click=alertDeleteIngredient(ingredient.id)><md-icon>close</md-icon></md-button>
                </div>
              </div>
              <md-divider></md-divider>
            </div>
          </md-list>
        </md-list>
        <md-button class="md-icon-button md-raised md-primary" @click="showDialog = true">
          <md-icon>add</md-icon>
          <md-tooltip md-direction="right" >Nouvel ingredient</md-tooltip>
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import axios from 'axios'
import Ingredient from '../../components/ingredient/Ingredient'
import IngredientForm from '../../components/ingredient/IngredientForm'

export default {
  name: 'Edit',
  data () {
    return {
      recipe: {
          name: '',
          ingredients: []
      },
      ingredient: {
        name: '',
        quantity: '',
        unity: '',
        recipeId: ''
      },
      ingredients: [],
      showDialog: false,
      active: false,
      deleteId: 0
    }
  },
  mounted() {
      var recipeId = this.$route.params.id
      let self = this
      axios
      .get('https://127.0.0.1:8000/api/recipes/'+recipeId)
      .then(function (response) {
        self.recipe = response.data
        if (self.recipe.ingredients.length > 0) {
          for (var $i = 0; $i < self.recipe.ingredients.length; $i++) {
              axios
              .get('https://127.0.0.1:8000'+self.recipe.ingredients[$i])
              .then(response => (self.updateIngredients(response.data)))
          }
        }
      })
  },
  methods: {
    save() {
      var recipeId = this.$route.params.id
      var toasted = this.$toasted
      axios
      .put('https://127.0.0.1:8000/api/recipes/'+recipeId, {
        name: this.recipe.name
      })
      .then(function (response) {
        if (200 === response.status) {
          toasted.success('Recipe successfully edited', {
            icon: 'check',
          })
          setTimeout(() => document.location.href = '/', 1500);
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
          self.resetIngredient()
          self.showDialog = false
        })
    },
    updateIngredients(ingredient) {
      this.ingredients.push(ingredient)
    },
    removeIngredient(ingredientId) {
      this.ingredients.forEach((ingredient, index) => {
        if (ingredient.id === ingredientId) {
          console.log(this.ingredients[index])
          this.ingredients.splice(index, 1)
        }
      });
    },
    resetIngredient() {
      this.ingredient = {
        name: '',
        quantity: '',
        unity: '',
        recipeId: ''
      }
    },
    alertDeleteIngredient(id) {
        this.active = true
        this.deleteId = id
    },
    onConfirm() {
        var toasted = this.$toasted
        let self = this
        axios
        .delete('https://127.0.0.1:8000/api/ingredients/'+this.deleteId)
        .then(function (response) {
            if (204 === response.status) {
                toasted.success('Ingredient successfully deleted', {
                    icon: 'check',
                })
            }
        })
        .catch(error => {
            if (undefined !== error.response) {
                toasted.error(error.response.data["hydra:description"], {
                    icon: 'report_problem',
                    duration: 10000
                })
            }
        })
        .finally(function () {
            self.removeIngredient(self.deleteId)
            self.deleteId = 0
            self.active = false
        })
    },
    onCancel() {
        this.active = false
    },
  },
  components: {
    Ingredient,
    IngredientForm
  }
}
</script>

<style scoped>
  .md-card-header .md-title {
    text-align: center;
  }
  @media (max-width: 959px) and (max-width: 600px) {
    .recipe-update-button {
      padding: 0;
      margin: 0;
    }
    .recipe-update-button .md-button {
      margin: 0;
      top: -15px;
    }
  }
</style>