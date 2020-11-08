<template>
    <div>
      <md-list-item>
        <md-icon class="md-small-hide">label_important</md-icon>
        <span class="md-list-item-text">{{ name }}<br><i>{{ quantity }} {{ unity }}</i></span>
      </md-list-item>
    </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: ['name', 'quantity', 'unity']
}
</script>

<style scoped>

</style>