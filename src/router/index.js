import Vue from 'vue'
import VueRouter from 'vue-router'
import Recipe from '@/components/recipe/Recipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Recipe
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "new" */ '../views/recipe/New.vue')
  },
  {
    path: '/:id/edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "new" */ '../views/recipe/Edit.vue')
  },
  {
    path: '/:id/show',
    name: 'Show',
    component: () => import(/* webpackChunkName: "new" */ '../views/recipe/Show.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "new" */ '../views/security/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
