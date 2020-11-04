<template>
  <div class="new">
    <IngredientDialogForm :show="showDialog" :ingredient="ingredient"/>
    <md-card>
      <md-card-header>
        <div class="md-title">Edit recipe "{{recipe.name}}"</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Recipe name</label>
              <md-input v-model="recipe.name">recipe.name</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-15">
            <md-button class="md-raised md-primary" v-on:click="save()">Update</md-button>
          </div>
        </div>
        <h3>Ingredients</h3>
        <md-list>
          <md-list>
              <Ingredient
                v-bind:key="ingredient.id"
                v-for="ingredient in ingredients"
                :name="ingredient.name" :quantity="ingredient.quantity" :unity="ingredient.unity" />
          </md-list>
        </md-list>
        <md-button class="md-icon-button md-raised md-primary" @click="showDialog = true">
          <md-icon>add</md-icon>
          <md-tooltip md-direction="right" >Add ingredient</md-tooltip>
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import axios from 'axios'
import Ingredient from '../components/Ingredient'
import IngredientDialogForm from '../components/IngredientDialogForm'

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
      showDialog: false
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
              console.log(self.recipe.ingredients[$i])
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
    updateIngredients(ingredient) {
      this.ingredients.push(ingredient)
    }
  },
  components: {
    Ingredient,
    IngredientDialogForm
  }
}
</script>