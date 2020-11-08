<template>
    <div>
        <!-- Dialog to confirm recipe deletion -->
        <md-dialog-confirm
        :md-active.sync="active"
        md-title="Delete recipe"
        md-content="Do you really want to delete this recipe ?"
        md-confirm-text="Delete"
        md-cancel-text="Cancel"
        @md-cancel="onCancel"
        @md-confirm="onConfirm" />

        <md-table v-if="recipes.length > 0">
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" v-bind:key="recipe.id" v-for="recipe in recipes">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{recipe.id}}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">
                    <router-link class="link" :to="{ name: 'Show', params: { id: recipe.id }}">{{recipe.name}}</router-link>
                </md-table-cell>
                <md-table-cell md-label="Edit" md-sort-by="edit">
                    <md-button class="md-icon-button md-raised md-primary">
                        <md-icon>add_shopping_cart</md-icon>
                        <md-tooltip md-direction="top">Add to shopping list</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button md-raised">
                        <router-link class="link" :to="{ name: 'Edit', params: { id: recipe.id }}"><md-icon>edit</md-icon></router-link>
                    </md-button>
                    <md-button class="md-icon-button md-accent" v-on:click=alertDeleteRecipe(recipe.id)><md-icon>close</md-icon></md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-empty-state v-else
            md-icon="search_off"
            md-label="No recipe found"
            md-description="Create your first recipe and start discovering awesome meal.">
            <md-button class="md-primary md-raised" :to="{name: 'New'}">Create first recipe</md-button>
        </md-empty-state>
    </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'List',
  data () {
    return {
      active: false,
      deleteId: 0
    }
  },
  props: {
      recipes: Array
  },
  methods: {
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
            }
        })
        .catch(error => {
            if (undefined !== error.response) {
                toasted.error(error.response.data["hydra:description"], {
                    icon: 'report_problem',
                    duration: 10000
                })
            }
        })
        .finally(function () {
            setTimeout(() => document.location.href = '/', 1500);
        })
    },
    onCancel() {
        this.active = false
    },
  }
}
</script>