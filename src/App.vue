<template>
  <div id="app">
    <div id="logo">
      <md-avatar>
        <router-link to="/">
          <img src="./assets/cook.jpg"> 
        </router-link>
      </md-avatar>
    </div>
    <router-view/>
    <md-button class="md-raised md-accent md-icon-button md-fab md-fab-bottom-left"><md-icon>receipt_long</md-icon></md-button>
    <md-button class="md-raised md-primary md-icon-button md-fab md-fab-bottom-right" to="/new" v-if="$route.path === '/'"><md-icon>add</md-icon></md-button>
  </div>
</template>

<style>
#app {
  padding: 10px;
}
#logo {
  display: flex;
}
#logo .md-avatar {
  width: 100px;
  height: 100px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  border-radius: 100px;
}
a.link {
  text-decoration: none !important;
}
</style>
