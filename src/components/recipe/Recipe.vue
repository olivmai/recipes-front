<template>
    <div>
        <div class="md-title">Mes recettes</div>
        <List :recipes="recipes" />
        <PaginationNav v-if="recipes.length > 0" />
    </div>
</template>

<script>
import axios from 'axios'
import PaginationNav from '../app/PaginationNav'
import List from '../../views/recipe/List'
import { mapState } from 'vuex'

const token = localStorage.getItem('api-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

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
  beforeCreate () {
    if (!localStorage.getItem('api-token')) {
        this.$router.push('/login')
    }
  },
  created () {
    axios
      .get('https://127.0.0.1:8000/api/recipes?page='+this.pagination.current)
      .then(response => (this.updateState(response.data)))
      .catch((error) => console.log(error.response))
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