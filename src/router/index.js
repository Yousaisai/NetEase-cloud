import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Home/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  redirect: "/Recommend",
  component: Layout,
  children: [{
    path: 'Recommend',
    component: () => import('../views/Recommend/index.vue')

  }, {
    path: 'Leaderboard',
    component: () => import('../views/Leaderboard/index.vue')

  }, {
    path: 'SongList',
    component: () => import('../views/SongList/index.vue')

  }, {
    path: 'RadioAnchor',
    component: () => import('../views/RadioAnchor/index.vue')

  }, {
    path: 'singer',
    component: () => import('../views/singer/index.vue')

  }, {
    path: 'AddedNewAlbum',
    component: () => import('../views/AddedNewAlbum/index.vue')

  }, ]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router