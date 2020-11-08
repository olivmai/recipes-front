<template>
    <div class="pagination-container">
        <span class="center-span">
            <md-button class="md-icon-button" v-on:click="goToFirst()"><md-icon>first_page</md-icon></md-button>
            <md-button class="md-icon-button" v-on:click="goToPrevious()"><md-icon>chevron_left</md-icon></md-button>
            <md-button class="md-icon-button" v-on:click="goToNext()"><md-icon>chevron_right</md-icon></md-button>
            <md-button class="md-icon-button" v-on:click="goToLast()"><md-icon>last_page</md-icon></md-button>
        </span>
    </div>
</template>

<script>
export default {
  name: 'PaginationNav'
}
</script>

<style scoped>
  .pagination-container {
      margin: auto;
  }
  .center-span {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>