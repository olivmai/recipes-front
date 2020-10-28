<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Recipe msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Recipe from '@/components/Recipe.vue'

export default {
  name: 'Home',
  components: {
    Recipe
  }
}
</script>
