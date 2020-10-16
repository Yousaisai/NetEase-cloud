/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-16 20:02:22
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
      album: "",
      onesong:"",//单个歌曲的详细数据，包括专辑等
    },
    //传入的整个歌单用于切换歌曲下首，还有全部播放
    AllSongs: [],
    //播放的第几个歌曲，哦那个与切换下一首
    IndexSong: 0
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
      commit('ST_AllSongs', allSong)
      commit('ST_PlaySong', oneSong)
      commit('ST_IndexSong', indexSong)
      var songs = await PlayOneSong(state.PlaySong.id)
      var commSong = {
        url: songs.data[0].url,
        name: oneSong.name,
        cover: oneSong.al.picUrl,
        time: oneSong.dt,
        album: oneSong.name,
        onesong:oneSong
      }
      commit('ST_SongDetail', commSong)
    },
    async SwitchSong({
      commit,
      state
    }, payload) {
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
        console.log(nextSong);
      }
      var songs = await PlayOneSong(nextSong.id)
      var commSong = {
        url: songs.data[0].url,
        name: nextSong.name,
        cover: nextSong.al.picUrl,
        time: nextSong.dt,
        album: nextSong.al.name,
        onesong:nextSong
      }
      commit('ST_SongDetail', commSong)
    }
  },
  modules: {}
})