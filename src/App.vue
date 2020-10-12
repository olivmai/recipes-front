<template>
  <div id="app">
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

    <md-table v-model="users" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>

      <md-table-row slot="md-table-row">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>test</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">test</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">test</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">test</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">test</md-table-cell>
      </md-table-row>
      <md-table-row slot="md-table-row">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>test</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">test</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">test</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">test</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">test</md-table-cell>
      </md-table-row>
      <md-table-row slot="md-table-row">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>test</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">test</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">test</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">test</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">test</md-table-cell>
      </md-table-row>
      <md-table-row slot="md-table-row">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>test</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">test</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">test</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">test</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">test</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  padding: 50px;
}
</style>
