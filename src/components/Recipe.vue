<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">Material Design with Vue.js 2 Demo</div>
                <div class="md-subhead">by CodingTheSmartWay.com</div>
            </md-card-header>
            <md-card-content>
                <md-button class="md-raised md-primary" v-on:click="fillTable()">Fill table</md-button>
                <md-button class="md-raised md-primary" v-on:click="clearTable()">Clear table</md-button>
            </md-card-content>
            </md-card>
            
            <br />
            
            <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Recipes</h1>
            </md-table-toolbar>

            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" v-bind:key="recipe.id" v-for="recipe in recipes">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{recipe.id}}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{recipe.name}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
export default {
  name: 'Recipe',
  props: {
    recipes: Array
  }
}
</script>