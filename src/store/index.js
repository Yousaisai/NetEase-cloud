/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-15 21:50:46
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  PlayOneSong
} from '@/api/index'



export default new Vuex.Store({
  state: {
    //播放音乐的资源，里面只有音乐ID
    PlaySong: "",
    //需要传到播放界面的参数,包含音乐url、音乐名name、封面cover、时长time、专辑album
    SongDetail: {
      url: "",
      name: "",
      cover: "",
      time: 0,
      album: ""
    },
    //传入的整个歌单用于切换歌曲下首，还有全部播放
    AllSongs: []
  },
  mutations: {
    ST_PlaySong: (state, payload) => {
      state.PlaySong = payload
    },
    ST_SongDetail: (state, payload) => {
      (state.SongDetail) = payload
    },
    ST_AllSongs: (state, payload) => {
      (state.AllSongs) = payload
    }
  },
  actions: {
    //获取播放歌曲的相关信息
    async PlaySongs({
      commit,
      state
    }, payload) {
      /*调用方式
        this.$store.dispatch("PlaySongs", {
        oneSong: 单条歌,
        allSong: 歌单,
      }); */
      var oneSong = payload.oneSong
      var allSong = payload.allSong
      commit('ST_AllSongs', allSong)
      commit('ST_PlaySong', oneSong)
      console.log(state.PlaySong);
      var songs = await PlayOneSong(state.PlaySong.id)
      console.log(songs);
      var commSong = {
        url: songs.data[0].url,
        name: oneSong.name,
        cover: oneSong.al.picUrl,
        time: oneSong.dt,
        album: oneSong.name
      }
      commit('ST_SongDetail', commSong)
    }
  },
  modules: {}
})