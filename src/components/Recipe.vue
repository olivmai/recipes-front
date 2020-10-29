<template>
    <div>
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
                            <md-button class="md-icon-button md-raised">
                                <router-link :to="{ name: 'Edit', params: { id: recipe.id }}"><md-icon>edit</md-icon></router-link>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card-content>
            <md-card-actions>
                <md-button class="md-raised md-primary" v-on:click="fillTable()">Fill table</md-button>
                <md-button class="md-raised md-primary" v-on:click="clearTable()">Clear table</md-button>
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
      apiResults: null
    }
  },
  methods: {
    editRecipe(id) {
        document.location.href = "/"+id+"/edit"
    }
  },
  mounted () {
    axios
      .get('https://127.0.0.1:8000/api/recipes')
      .then(response => (this.apiResults = response.data['hydra:member']))
  }
}
</script>