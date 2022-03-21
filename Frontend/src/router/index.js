import Vue from 'vue'
import VueRouter from 'vue-router'
import connection from '../views/Connection.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'connection',
    component: connection
  },
  {
    path: '/Inscription_page',
    name: 'inscription_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Inscription_page.vue')
  },
  {
    path: '/Posts_page',
    name: 'posts_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Posts_page.vue')
  },
  {
    path: '/Profil_page',
    name: 'profil_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Profil_page.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
