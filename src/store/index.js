/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-29 12:54:05
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  PlayOneSong,
  AuthSongId,
} from '@/api/index'

import {
  Message
} from 'element-ui'


export default new Vuex.Store({
  state: {
    isLogin: false,
    //播放音乐的资源，里面只有音乐ID
    PlaySong: "",
    //需要传到播放界面的参数,包含音乐url、音乐名name、封面cover、时长time、专辑album
    SongDetail: {

      name: "",
      cover: "",
      time: 0,
      album: "",
      onesong: "", //单个歌曲的详细数据，包括专辑等
    },
    //传入的整个歌单用于切换歌曲下首，还有全部播放
    AllSongs: [],
    //播放的第几个歌曲，哦那个与切换下一首
    IndexSong: 0,
    BannerUrl: "",
    index: 1, //这个是添加音乐，插入播放
    currentLyric:0
  },
  mutations: {
    ST_PlaySong: (state, payload) => {
      state.PlaySong = payload
    },
    ST_SongDetail: (state, payload) => {
      (state.SongDetail) = payload
      localStorage.setItem("SongDetail", JSON.stringify(payload))
    },
    ST_AllSongs: (state, payload) => {
      (state.AllSongs) = payload
      localStorage.setItem("AllSongs", JSON.stringify(payload))
    },
    ST_IndexSong: (state, payload) => {
      (state.IndexSong) = payload
    },

  },
  actions: {
    //获取播放歌曲的相关信息
    async PlaySongs({
      commit,
      dispatch,
      state
    }, payload) {

      /*调用方式
        this.$store.dispatch("PlaySongs", {
        oneSong: 单条歌,
        allSong: 歌单,
        indexSong:歌曲序号，便于切换歌曲
      }); */
      var oneSong = payload.oneSong
      var allSong = payload.allSong
      var indexSong = payload.indexSong
      console.log(indexSong);
      commit('ST_AllSongs', allSong)
      commit('ST_PlaySong', oneSong)
      commit('ST_IndexSong', indexSong)

      try {
        var auth = await AuthSongId(state.PlaySong.id) //首先判断音乐是否可用
        auth = auth.message
        if (auth != "ok") {
          Message({
            message: auth,
            type: 'warning'
          })
          return

        } else {
          dispatch("AuthSongId", state.PlaySong)
        }
      } catch (e) {
        console.log(e);
        Message({
          message: "暂无播放资源",
          type: 'warning'
        })
      }

    },
    async SwitchSong({
      commit,
      state,
      dispatch
    }, payload) {
      console.log(state.IndexSong);
      var nextSong = {}
      if (state.AllSongs.length == 0) {
        state.AllSongs = JSON.parse(localStorage.getItem("AllSongs"))
      }
      if (payload == "next") {
        if (state.IndexSong == state.AllSongs.length - 1) {
          state.IndexSong = 0
        }
        state.IndexSong = state.IndexSong + 1
        nextSong = state.AllSongs[state.IndexSong]

      } else {
        //到顶层就会推到最后
        if (state.IndexSong == 0) {
          state.IndexSong = state.AllSongs.length
        }
        state.IndexSong = state.IndexSong - 1
        nextSong = state.AllSongs[state.IndexSong]
      }
      //首先判断音乐是否可用
      try {
        var auth = await AuthSongId(nextSong.id)

        auth = auth.message
        if (auth == "ok") {
          dispatch("AuthSongId", nextSong)
        } else {
          Message({
            message: auth,
            type: 'warning'
          })
          return
        }

      } catch (e) {
        //TODO handle the exception
        console.log(e);
        Message({
          message: "暂无播放资源",
          type: 'warning'
        })
      }

    },
    //授权的音乐播放
    async AuthSongId({
      commit,
      state
    }, payload) {
      var songs = await PlayOneSong(payload.id)
      var commSong = {
        url: songs.data[0].url,
        name: payload.name,
        cover: payload.al ? payload.al.picUrl : payload.artists[0].img1v1Url,
        time: payload.dt ? payload.dt : payload.duration,
        album: payload.al ? payload.al.name : payload.album.name,
        onesong: payload
      }
      commit('ST_SongDetail', commSong)

    },
    //往播放列表中加入歌曲
    AddMusic({
      commit,
      state
    }, payload) {
      state.AllSongs.splice(state.IndexSong + state.index, 0, payload)
      state.index++
    }

  },
  modules: {}
})