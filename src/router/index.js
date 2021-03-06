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
        path: '/Mymuisc',
        name: 'Mymuisc',
        meta: {
          title: '我的音乐'
        },
        component: () => import('../views/MyMusic/index.vue'),
      },
      {
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
      }, , {
        path: '/AllNetMusic',
        component: () => import('../views/AllNetMusic/index.vue'),
        meta: {
          title: '全网搜索'
        },
      },
      /*导航栏开始 */
      {
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
        component: () => import('../views/FindMusic/Singer/index.vue'),
        meta: {
          title: '歌手'
        },
      }, {
        path: '/AddedNewAlbum',
        component: () => import('../views/FindMusic/AddedNewAlbum/index.vue'),
        meta: {
          title: '新碟上架'
        },
      },
      /*导航栏结束 */
      /*其他路由，存在导航栏 */
      {
        path: '/PlayList',
        name: 'Playlist',
        component: () => import('../views/PlayListDetail/index.vue'),
        meta: {
          title: '歌单详情'
        },
      }, {
        path: '/NewAlbum',
        name: 'Newalbum',
        component: () => import('../views/NewAlbum/index.vue'),
        meta: {
          title: '新碟详情'
        },
      },
      {
        path: '/SingerDetail',
        name: 'Singerdetail',
        component: () => import('../views/SingerDetail/index.vue'),
        meta: {
          title: '歌手详情'
        },

        children: [{
          path: '/SingerDetail/Music',
          component: () => import('../views/SingerDetail/Music/index.vue'),
          meta: {
            title: '歌曲'
          },
        }, {
          path: '/SingerDetail/Album',
          component: () => import('../views/SingerDetail/Album/index.vue'),
          meta: {
            title: '专辑'
          },
        }, {
          path: '/SingerDetail/Mv',
          component: () => import('../views/SingerDetail/Mv/index.vue'),
          meta: {
            title: 'MV'
          },
        }, {
          path: '/SingerDetail/Desc',
          component: () => import('../views/SingerDetail/Desc/index.vue'),
          meta: {
            title: '简介'
          },
        }, ]

      }, {
        path: '/PlayDetail',
        component: () => import('../views/PlayDetail/index.vue'),
        meta: {
          title: '音乐详情'
        },
      }, {
        path: '/PlayMv',
        component: () => import('../views/MvPlay/index.vue'),
        meta: {
          title: 'MV详情'
        },
      },
      {
        path: '/Search',
        name: 'Search',
        redirect: '/Search/SongsList',
        component: () => import('../views/Search/index.vue'),
        meta: {
          title: '搜索'
        },

        children: [{
          path: '/Search/SongsList',
          component: () => import('../views/Search/SongsList/index.vue'),
          meta: {
            title: '单曲'
          },
        }, {
          path: '/Search/Album',
          component: () => import('../views/Search/Album/index.vue'),
          meta: {
            title: '专辑'
          },
        }, {
          path: '/Search/Mv',
          component: () => import('../views/Search/Mv/index.vue'),
          meta: {
            title: 'MV'
          },
        }, {
          path: '/Search/PlayList',
          component: () => import('../views/Search/PlayList/index.vue'),
          meta: {
            title: '歌单'
          },
        }, {
          path: '/Search/Singers',
          component: () => import('../views/Search/Singers/index.vue'),
          meta: {
            title: '歌手'
          },
        }, ]

      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router