import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: [],
    token: localStorage.getItem('api-token')
  },
  mutations: {
    ADD_RECIPE(state, recipe = {}) {
      state.recipes.push(recipe)
    }
  },
  actions: {
    addRecipes(context, recipes) {
      var exist = false
      var currentRecipes = context.state.recipes
      for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i]
        for (var j = 0; j < currentRecipes.length; j++) {
          if (currentRecipes[j].id === recipe.id) {
            exist = true
          }
        }
        if (!exist) {
          context.commit('ADD_RECIPE', recipe)
        }
      } 
    }
  },
  modules: {
  }
})
