<template>
  <div id="app">
    <div class="page-container md-layout-column">
      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">
          <router-link :to="{name: 'Home'}">Liste de courses</router-link>
        </span>
      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">My App name</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-drawer>

      <md-content>
        <router-view/>
        <md-button class="md-raised md-accent md-icon-button md-fab md-fab-bottom-left" v-if="$route.path === '/'"><md-icon>receipt_long</md-icon></md-button>
        <md-button class="md-raised md-primary md-icon-button md-fab md-fab-bottom-right" to="/new" v-if="$route.path === '/'"><md-icon>add</md-icon></md-button>
      </md-content>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      showNavigation: false,
      showSidepanel: false
    })
  }
</script>

<style>
#app .page-container .md-title a {
  color: #fff;
  text-decoration: none;
}
.page-container {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
}
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
