import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import toasted from 'vue-toasted'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(toasted, {
  duration: 2000,
  fullWidth: true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
