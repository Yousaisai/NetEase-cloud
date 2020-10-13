import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Home/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  redirect: "/Recommend",
  component: Layout,
  meta: {
    title: '推荐'
  },
  children: [{
    path: '/Recommend',
    component: () => import('../views/FindMusic/Recommend/index.vue'),
    meta: {
      title: '推荐'
    },
  }, {
    path: '/Leaderboard',
    component: () => import('../views/FindMusic/Leaderboard/index.vue'),
    meta: {
      title: '排行榜'
    },
  }, {
    path: '/SongList',
    component: () => import('../views/FindMusic/SongList/index.vue'),
    meta: {
      title: '歌单'
    },
  }, {
    path: '/RadioAnchor',
    component: () => import('../views/FindMusic/RadioAnchor/index.vue'),
    meta: {
      title: '主播电台'
    },
  }, {
    path: '/Singer',
    component: () => import('../views/FindMusic/singer/index.vue'),
    meta: {
      title: '歌手'
    },
  }, {
    path: '/AddedNewAlbum',
    component: () => import('../views/FindMusic/AddedNewAlbum/index.vue'),
    meta: {
      title: '新碟上架'
    },
  }, ]
}, {
  path: '/',
  name: 'Mymuisc',
  meta: {
    title: '我的歌单'
  },
  redirect: "/MyCreateList",
  component: () => import('../views/MyMusic/index.vue'),
  children: [{
    path: '/MyCreateList',
    component: () => import('../views/MyMusic/MyCreateList/index.vue'),
    meta: {
      title: '我的歌单'
    },
  }, {
    path: '/MyLoveList',
    component: () => import('../views/MyMusic/MyLoveList/index.vue'),
    meta: {
      title: '收藏歌单'
    },
  }]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router