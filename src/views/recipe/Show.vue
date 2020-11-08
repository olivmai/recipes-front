<template>
  <div class="new">
      <md-card>
      <md-card-header>
        <div class="md-title">{{ recipe.name }}</div>
      </md-card-header>

      <md-card-content>
        <h3>Ingredients</h3>
          <md-list>
              <Ingredient
                v-bind:key="ingredient.id"
                v-for="ingredient in ingredients"
                :name="ingredient.name" :quantity="ingredient.quantity" :unity="ingredient.unity" />
          </md-list>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-icon-button md-raised md-primary">
            <md-icon>add_shopping_cart</md-icon>
            <md-tooltip md-direction="top">Add to shopping list</md-tooltip>
        </md-button>
        <md-button class="md-icon-button md-raised">
            <router-link class="link" :to="{ name: 'Edit', params: { id: recipe.id }}"><md-icon>edit</md-icon></router-link>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>

import axios from 'axios'
import Ingredient from '../../components/ingredient/Ingredient'

export default {
  name: 'Show',
  data () {
    return {
      recipe: {
          name: ''
      },
      ingredients: []
    }
  },
  mounted() {
      var recipeId = this.$route.params.id
      let self = this
      axios
      .get('https://127.0.0.1:8000/api/recipes/'+recipeId)
      .then(function (response) {
          self.recipe = response.data
          console.log(self.recipe.ingredients)
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
    updateIngredients(ingredient) {
      this.ingredients.push(ingredient)
    }
  },
  components: {
      Ingredient
  }
}
</script>