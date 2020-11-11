<template>
  <div class="new">
    <md-card>
      <md-card-header>
        <div class="md-title">Nouvelle recette</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Nom de la recette</label>
          <md-input v-model="recipeName"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" v-on:click="save()">Enregistrer</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'New',
  data () {
    return {
      recipeName: null,
      registeredRecipe: Object
    }
  },
  methods: {
    save() {
      var toasted = this.$toasted
      var self = this
      axios
      .post('https://127.0.0.1:8000/api/recipes', {
        name: this.recipeName
      })
      .then(function (response) {
        if (201 === response.status) {
          self.registeredRecipe = response.data
          toasted.success('New recipe successfully added', {
            icon: 'check',
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() => self.$router.push({ name: 'Edit', params: { id: self.registeredRecipe.id }}))
    }
  }
}
</script>