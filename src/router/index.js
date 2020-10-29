import Vue from 'vue'
import VueRouter from 'vue-router'
import Recipe from '@/components/Recipe.vue'

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
    // route level code-splitting
    // this generates a separate chunk (new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/New.vue')
  },
  {
    path: '/:id/edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "new" */ '../views/Edit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
