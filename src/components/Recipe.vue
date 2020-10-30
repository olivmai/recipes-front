<template>
    <div>
        <md-dialog-confirm
        :md-active.sync="active"
        md-title="Delete recipe"
        md-content="Do you really want to delete this recipe ?"
        md-confirm-text="Delete"
        md-cancel-text="Cancel"
        @md-cancel="onCancel"
        @md-confirm="onConfirm" />
        <md-card>
            <md-card-header>
                <div class="md-title">Recipes</div>
            </md-card-header>
            <md-card-content>
                <md-table>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Name</md-table-head>
                        <md-table-head>Edit</md-table-head>
                    </md-table-row>

                    <md-table-row slot="md-table-row" v-bind:key="recipe.id" v-for="recipe in apiResults">
                        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{recipe.id}}</md-table-cell>
                        <md-table-cell md-label="Name" md-sort-by="name">{{recipe.name}}</md-table-cell>
                        <md-table-cell md-label="Edit" md-sort-by="edit">
                            <md-button class="md-icon-button md-raised md-primary">
                                <router-link class="link" :to="{ name: 'Edit', params: { id: recipe.id }}"><md-icon>edit</md-icon></router-link>
                            </md-button>
                            <md-button class="md-icon-button md-accent" v-on:click=alertDeleteRecipe(recipe.id)><md-icon>close</md-icon></md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card-content>
            <md-card-actions md-alignment="space-between">
                <span class="center-span">
                    <md-button class="md-icon-button" v-on:click="goToFirst()"><md-icon>first_page</md-icon></md-button>
                    <md-button class="md-icon-button" v-on:click="goToPrevious()"><md-icon>chevron_left</md-icon></md-button>
                    <md-button class="md-icon-button" v-on:click="goToNext()"><md-icon>chevron_right</md-icon></md-button>
                    <md-button class="md-icon-button" v-on:click="goToLast()"><md-icon>last_page</md-icon></md-button>
                </span>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Recipe',
  data () {
    return {
      apiResults: null,
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
    alertDeleteRecipe(id) {
        this.active = true
        this.deleteId = id
    },
    onConfirm() {
        var toasted = this.$toasted
        let self = this
        axios
        .delete('https://127.0.0.1:8000/api/recipes/'+this.deleteId)
        .then(function (response) {
            if (204 === response.status) {
                self.deleteId = 0;
                toasted.success('Recipe successfully deleted', {
                    icon: 'check',
                })
                setTimeout(() => document.location.href = '/', 1500);
            }
        })
    },
    onCancel() {
        this.active = false
    },
    updatePagination(pagination) {
        this.pagination.current = pagination["@id"]
        this.pagination.first = pagination["hydra:first"]
        this.pagination.total = pagination["hydra:last"] !== undefined ? pagination["hydra:last"] : pagination["hydra:first"]
        this.pagination.next = pagination["hydra:next"]  !== undefined ? pagination["hydra:next"] : pagination["hydra:first"]
        this.pagination.previous = pagination["hydra:previous"]  !== undefined ? pagination["hydra:previous"] : pagination["hydra:first"]
    },
    updateData(apiResults) {
        this.apiResults = apiResults
    },
    updateState(data) {
        this.updateData(data["hydra:member"])
        this.updatePagination(data["hydra:view"])
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
    }
  },
  mounted () {
    axios
      .get('https://127.0.0.1:8000/api/recipes?page='+this.pagination.current)
      .then(response => (this.updateState(response.data)))
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