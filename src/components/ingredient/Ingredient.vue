<template>
    <div>
      <md-list-item>
        <md-icon>label_important</md-icon>
        <span class="md-list-item-text">{{ name }} ({{ quantity }} {{ unity }})</span>
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