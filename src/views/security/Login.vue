<template>
  <div class="new md-layout">
      <md-card class="md-layout-item md-size-40 md-small-size-90 md-alignment-top-center">
      <md-card-header>
        <div class="md-title md-alignment-centered">Connexion</div>
      </md-card-header>

      <md-card-content>
        <md-field>
            <md-icon>person</md-icon>
            <label>Email</label>
            <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
            <md-icon>vpn_key</md-icon>
            <label>Mot de passe</label>
            <md-input v-model="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary" @click="login()">Connexion</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
      return {
          email: '',
          password: ''
      }
  },
  methods: {
    login() {
        var toasted = this.$toasted
        let self = this
        axios
        .post('https://127.0.0.1:8000/authentication_token', {
            email: this.email,
            password: this.password
        })
        .then(function (response) {
            if (200 === response.status) {
                localStorage.setItem('api-token', response.data["token"])
            }
        })
        .catch(function (error) {
            toasted.error(error.response.data["message"], {
                icon: 'report_problem',
                duration: 2000
            })
        })
        .finally(() => self.$router.push('/'))
        }
    }
}
</script>

<style scoped>
.md-card.md-layout-item {
    margin: auto;
}
</style>