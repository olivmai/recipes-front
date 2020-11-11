<template>
  
</template>

<script>
  export default {
    name: 'Drawer',
    data: () => ({
      showNavigation: false,
      showSidepanel: false
    })
  }
</script>

<style scoped>
  .page-container {
    min-height: 300px;
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
</style>