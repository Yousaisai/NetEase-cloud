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
    path: '/Recommend',
    component: () => import('../views/FindMusic/Recommend/index.vue')

  }, {
    path: '/Leaderboard',
    component: () => import('../views/FindMusic/Leaderboard/index.vue')

  }, {
    path: '/SongList',
    component: () => import('../views/FindMusic/SongList/index.vue')

  }, {
    path: '/RadioAnchor',
    component: () => import('../views/FindMusic/RadioAnchor/index.vue')

  }, {
    path: '/singer',
    component: () => import('../views/FindMusic/singer/index.vue')

  }, {
    path: '/AddedNewAlbum',
    component: () => import('../views/FindMusic/AddedNewAlbum/index.vue')

  }, ]
}, {
  path: '/',
  name: 'Mymuisc',
  redirect: "/MyCreateList",
  component: () => import('../views/MyMusic/index.vue'),
  children: [{
    path: '/MyCreateList',
    component: () => import('../views/MyMusic/MyCreateList/index.vue')

  },{
    path: '/MyLoveList',
    component: () => import('../views/MyMusic/MyLoveList/index.vue')

  } ]
},]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router