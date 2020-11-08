<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">Mes recettes</div>
            </md-card-header>
            <md-card-content>
                <List :recipes="recipes" />
            </md-card-content>
            <md-card-actions>
                <PaginationNav v-if="recipes.length > 0" />
            </md-card-actions>
        </md-card>

    </div>
</template>

<script>
import axios from 'axios'
import PaginationNav from '../app/PaginationNav'
import List from '../../views/recipe/List'
import { mapState } from 'vuex'

export default {
  name: 'Recipe',
  computed: {
      ...mapState(['recipes'])
  },
  data () {
    return {
      pagination: {
          current: 1,
          first: 1,
          next: 1,
          total: 1,
          previous: 1
      },
      active: false,
      deleteId: 0
    }
  },
  methods: {
    editRecipe(id) {
        document.location.href = "/"+id+"/edit"
    },
    updatePagination(pagination) {
        this.pagination.current = pagination["@id"]
        this.pagination.first = pagination["hydra:first"]
        this.pagination.total = pagination["hydra:last"] !== undefined ? pagination["hydra:last"] : pagination["hydra:first"]
        this.pagination.next = pagination["hydra:next"]  !== undefined ? pagination["hydra:next"] : pagination["hydra:first"]
        this.pagination.previous = pagination["hydra:previous"]  !== undefined ? pagination["hydra:previous"] : pagination["hydra:first"]
    },
    updateState(data) {
        this.$store.dispatch('addRecipes', data["hydra:member"])
        if (undefined !== data["hydra:view"]) {
            this.updatePagination(data["hydra:view"])
        }
    },
    goToNext() {
        axios
        .get('https://127.0.0.1:8000'+this.pagination.next)
        .then(response => (this.updateState(response.data)))
    },
    goToPrevious() {
        axios
        .get('https://127.0.0.1:8000'+this.pagination.previous)
        .then(response => (this.updateState(response.data)))
    },
    goToFirst() {
        axios
        .get('https://127.0.0.1:8000'+this.pagination.first)
        .then(response => (this.updateState(response.data)))
    },
    goToLast() {
        axios
        .get('https://127.0.0.1:8000'+this.pagination.last)
        .then(response => (this.updateState(response.data)))
    },
    open(recipeId) {
        document.location.href = '/'+recipeId+'/show'
    }
  },
  created () {
    axios
      .get('https://127.0.0.1:8000/api/recipes?page='+this.pagination.current)
      .then(response => (this.updateState(response.data)))
  },
  components: {
      PaginationNav,
      List
  }
}
</script>

<style scoped>
  .center-span {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>