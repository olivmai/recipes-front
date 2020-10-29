<template>
  <div id="app">
    <div id="nav">
      <md-button class="md-primary"><router-link to="/">Home</router-link></md-button>
      <md-button class="md-primary"><router-link to="/new">New</router-link></md-button>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  padding: 50px;
}
a.link {
  text-decoration: none !important;
}
</style>
