<template>
  <div id="app">
    <Recipe v-bind:recipes="apiResults" />
  </div>
</template>

<script>
import Recipe from './components/Recipe.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Recipe
  },
  data () {
    return {
      apiResults: null
    }
  },
  mounted () {
    axios
      .get('https://127.0.0.1:8000/api/recipes')
      .then(response => (this.apiResults = response.data['hydra:member']))
      
  }
}
</script>

<style>
#app {
  padding: 50px;
}
</style>
