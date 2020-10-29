<template>
  <div class="new">
    <md-card>
      <md-card-header>
        <div class="md-title">Add new recipe</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Initial Value</label>
          <md-input v-model="recipeName"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" v-on:click="save()">Save</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      recipeName: null
    }
  },
  methods: {
    save() {
      var toasted = this.$toasted
      axios
      .post('https://127.0.0.1:8000/api/recipes', {
        name: this.recipeName
      })
      .then(function (response) {
        if (201 === response.status) {
          console.log(response)
          toasted.success('New recipe successfully added', {
            icon: 'check',
          })
          setTimeout(() => document.location.href = '/', 1500);
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>