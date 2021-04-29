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
        component: () => import(/*webpackChunkName:'Mymuisc'*/'../views/MyMusic/index.vue'),
      },
      {
        path: '/MyCreateList',
        component: () => import(/*webpackChunkName:'MyCreateList'*/'../views/MyMusic/MyCreateList/index.vue'),
        meta: {
          title: '我的歌单'
        },
      }, {
        path: '/MyLoveList',
        component: () => import(/*webpackChunkName:'MyLoveList'*/'../views/MyMusic/MyLoveList/index.vue'),
        meta: {
          title: '收藏歌单'
        },
      }, , {
        path: '/AllNetMusic',
        component: () => import(/*webpackChunkName:'AllNetMusic'*/'../views/AllNetMusic/index.vue'),
        meta: {
          title: '全网搜索'
        },
      },
      /*导航栏开始 */
      {
        path: '/Recommend',
        component: () => import(/*webpackChunkName:'Recommend'*/'../views/FindMusic/Recommend/index.vue'),
        meta: {
          title: '推荐'
        },
      }, {
        path: '/Leaderboard',
        component: () => import(/*webpackChunkName:'Leaderboard'*/'../views/FindMusic/Leaderboard/index.vue'),
        meta: {
          title: '排行榜'
        },
      }, {
        path: '/SongList',
        component: () => import(/*webpackChunkName:'SongList'*/'../views/FindMusic/SongList/index.vue'),
        meta: {
          title: '歌单'
        },
      }, {
        path: '/RadioAnchor',
        component: () => import(/*webpackChunkName:'RadioAnchor'*/'../views/FindMusic/RadioAnchor/index.vue'),
        meta: {
          title: '主播电台'
        },
      }, {
        path: '/Singer',
        component: () => import(/*webpackChunkName:'Singer'*/'../views/FindMusic/Singer/index.vue'),
        meta: {
          title: '歌手'
        },
      }, {
        path: '/AddedNewAlbum',
        component: () => import(/*webpackChunkName:'AddedNewAlbum'*/'../views/FindMusic/AddedNewAlbum/index.vue'),
        meta: {
          title: '新碟上架'
        },
      },
      /*导航栏结束 */
      /*其他路由，存在导航栏 */
      {
        path: '/PlayList',
        name: 'Playlist',
        component: () => import(/*webpackChunkName:'PlayList'*/'../views/PlayListDetail/index.vue'),
        meta: {
          title: '歌单详情'
        },
      }, {
        path: '/NewAlbum',
        name: 'Newalbum',
        component: () => import(/*webpackChunkName:'NewAlbum'*/'../views/NewAlbum/index.vue'),
        meta: {
          title: '新碟详情'
        },
      },
      {
        path: '/SingerDetail',
        name: 'Singerdetail',
        component: () => import(/*webpackChunkName:'SingerDetail'*/'../views/SingerDetail/index.vue'),
        meta: {
          title: '歌手详情'
        },

        children: [{
          path: '/SingerDetail/Music',
          component: () => import(/*webpackChunkName:'Music'*/'../views/SingerDetail/Music/index.vue'),
          meta: {
            title: '歌曲'
          },
        }, {
          path: '/SingerDetail/Album',
          component: () => import(/*webpackChunkName:'Album'*/'../views/SingerDetail/Album/index.vue'),
          meta: {
            title: '专辑'
          },
        }, {
          path: '/SingerDetail/Mv',
          component: () => import(/*webpackChunkName:'Mv'*/'../views/SingerDetail/Mv/index.vue'),
          meta: {
            title: 'MV'
          },
        }, {
          path: '/SingerDetail/Desc',
          component: () => import(/*webpackChunkName:'Desc'*/'../views/SingerDetail/Desc/index.vue'),
          meta: {
            title: '简介'
          },
        }, ]

      }, {
        path: '/PlayDetail',
        component: () => import(/*webpackChunkName:'PlayDetail'*/'../views/PlayDetail/index.vue'),
        meta: {
          title: '音乐详情'
        },
      }, {
        path: '/PlayMv',
        component: () => import(/*webpackChunkName:'PlayMv'*/'../views/MvPlay/index.vue'),
        meta: {
          title: 'MV详情'
        },
      },
      {
        path: '/Search',
        name: 'Search',
        redirect: '/Search/SongsList',
        component: () => import(/*webpackChunkName:'Search'*/'../views/Search/index.vue'),
        meta: {
          title: '搜索'
        },

        children: [{
          path: '/Search/SongsList',
          component: () => import(/*webpackChunkName:'SearchSongsList'*/'../views/Search/SongsList/index.vue'),
          meta: {
            title: '单曲'
          },
        }, {
          path: '/Search/Album',
          component: () => import(/*webpackChunkName:'SearchAlbum'*/'../views/Search/Album/index.vue'),
          meta: {
            title: '专辑'
          },
        }, {
          path: '/Search/Mv',
          component: () => import(/*webpackChunkName:'SearchMv'*/'../views/Search/Mv/index.vue'),
          meta: {
            title: 'MV'
          },
        }, {
          path: '/Search/PlayList',
          component: () => import(/*webpackChunkName:'SearchPlayList'*/'../views/Search/PlayList/index.vue'),
          meta: {
            title: '歌单'
          },
        }, {
          path: '/Search/Singers',
          component: () => import(/*webpackChunkName:'SearchSingers'*/'../views/Search/Singers/index.vue'),
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