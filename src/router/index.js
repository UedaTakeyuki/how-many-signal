import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  },
  {
    path: '/code',
    name: 'Code',
    beforeEnter() {location.href = 'https://github.com/UedaTakeyuki/how-many-signal'}
  },
  {
    path: '/document',
    name: 'Document',
    beforeEnter() {location.href = 'https://github.com/UedaTakeyuki/how-many-signal/blob/main/README.md'}
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
