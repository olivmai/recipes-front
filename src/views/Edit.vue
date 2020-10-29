<template>
  <div class="new">
    <md-card>
      <md-card-header>
        <div class="md-title">Edit recipe #{{ $route.params.id }}</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Recipe name</label>
          <md-input v-model="recipe.name">recipe.name</md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" v-on:click="save()">Update</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  data () {
    return {
      recipe: {
          name: ''
      }
    }
  },
  mounted() {
      var recipeId = this.$route.params.id
      axios
      .get('https://127.0.0.1:8000/api/recipes/'+recipeId)
      .then(response => (this.recipe = response.data))
  },
  methods: {
    save() {
      var recipeId = this.$route.params.id
      axios
      .put('https://127.0.0.1:8000/api/recipes/'+recipeId, {
        name: this.recipe.name
      })
      .then(function (response) {
        console.log(response)
        document.location.href = '/'
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>