<template>
    <div>
        <div class="md-layout md-gutter md-alignment-space-between ingredient-form-container">
            <div class="md-layout-item">
                <md-field md-inline>
                    <label>Nom</label>
                    <md-input v-model="ingredient.name"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field md-inline>
                    <label>Quantité</label>
                    <md-input v-model="ingredient.quantity"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field md-inline>
                    <label>Unité</label>
                    <md-input v-model="ingredient.unity"></md-input>
                </md-field>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'IngredientForm',
  props: {
      ingredient: Object
  }
}
</script>

<style scoped>
  .ingredient-form-container {
    padding: 25px;
  }
</style>

