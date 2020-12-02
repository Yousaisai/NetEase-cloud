<!--
 * @Descripttion: 播放音乐
注意播放音频方法
controls 是否显示音乐控件
muted 是否静音
loop 是否循环播放
autoplay 是否自动播放
preload 预加载策略 推荐preload="auto"
audio.play() 播放
audio.pause() 暂停
audio.currentTime 当前播放时间,可以用来快进
audio.volume 声音
audio.playbackRate 播放速度
audio.paused是一个只读属性，表示当前音频是否处于暂停状态。  true或false
  @timeupdate="onTimeupdate" ontimeupdate事件大概每秒一次，用来更新音频流的当前播放时间
  @loadedmetadata="onLoadedmetadata" on加载语音流元数据完成后，会触发该事件的回调函数
// 语音元数据主要是语音的长度之类的数据
 * @Author: Mr.You
 * @Date: 2020-10-12 19:41:46
 * @LastEditTime: 2020-12-02 14:07:22
-->

<template>
  <div class="content">
    <audio
      ref="audio"
      :src="url"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      preload="auto"
      :autoplay="true"
      :muted="false"
      :loop="false"
    ></audio>
    <div class="btn">
      <span>
        <svg-icon
          @click="SwitchSongs('last')"
          style="font-size: 18px"
          icon-class="上一首" /></span
      ><span>
        <svg-icon
          v-if="showStart"
          style="font-size: 38px"
          @click="end"
          icon-class="暂停" />
        <svg-icon
          v-if="!showStart"
          @click="start"
          style="font-size: 38px"
          icon-class="开始 (1)" /></span
      ><span>
        <svg-icon
          @click="SwitchSongs('next')"
          style="font-size: 18px"
          icon-class="下一首"
      /></span>
    </div>
    <div class="pic">
      <svg-icon v-if="!cover" style="font-size: 18rem" icon-class="网易云" />
      <router-link
        style="text-decoration: none"
        :to="{ path: '/PlayDetail', query: { id: onesong.id } }"
      >
        <el-image
          v-if="cover"
          style="width: 35rem; border-radius: 30%; height: 35rem"
          :src="cover"
          :lazy="true"
        ></el-image>
      </router-link>
    </div>
    <div class="border">
      <div class="title">
        <span v-if="lyric.length == 0">正在搜索歌词</span>
        <span else>{{ lyricText }}</span>
      </div>
      <div class="slider">
        <div class="songer">
          <span>歌曲：{{ name }}</span>

          <router-link
            style="text-decoration: none"
            :to="{
              path: '/SingerDetail/Music',
              query: {
                id: onesong.ar ? onesong.ar[0].id : onesong.artists[0].id,
              },
            }"
          >
            <span
              >歌手：{{
                onesong.ar ? onesong.ar[0].name : onesong.artists[0].name
              }}</span
            >
          </router-link>
          <router-link
            style="text-decoration: none"
            :to="{
              path: '/NewAlbum',
              query: { id: onesong.al ? onesong.al.id : onesong.album.id },
            }"
          >
            <span>专辑：{{ album }}</span></router-link
          >
        </div>
        <div class="slider_detail">
          <el-slider
            :max="time"
            @change="editTime"
            :show-tooltip="false"
            v-model="SongTime"
          ></el-slider>
        </div>
      </div>
    </div>
    <div class="time">
      {{ milltosecond(SongTime) }}/{{ milltosecond(time) }}
    </div>
    <div class="other">
      <div class="playlist">
        <div class="listdata" v-show="showList">
          <play-list></play-list>
        </div>
        <svg-icon icon-class="播放列表" @click="showList = !showList" />
      </div>
      <div class="love">
        <svg-icon @click="getLikeMusic(onesong)" icon-class="心 爱心 (3)" />
      </div>
      <div class="volume">
        <div class="svg" @click="showVol = !showVol">
          <svg-icon style="font-size: 1.5em" icon-class="喇叭广播 (1)" />
        </div>
        <div class="slider" v-show="showVol">
          <el-slider
            v-model="volume"
            :show-tooltip="false"
            vertical
            height="80rem"
            @change="editVol"
          >
          </el-slider>
        </div>
      </div>
      <div class="down">
        <svg-icon
          @click="download" 
          icon-class="下载 (1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { millisToMinutesAndSeconds, SongLyric } from "@/api/index";
import playList from "./playList/index";
export default {
  components: {
    playList,
  },
  data() {
    return {
      SongTime: 1,
      showList: false,
      volume: 50, //声音
      showVol: false,
      showStart: false,
      url: "", //音乐Url
      name: "Music", //音乐名
      cover: "", //音乐封面
      time: 100, //音乐时间，传入的数字是毫秒级
      album: "", //音乐专辑
      playing: false, //音频是否在播放
      onesong: {}, //一首歌的详情
      lyric: [], //歌词
      currentLyric: 0, //当前歌词行数
      lyricText: "音乐歌词", //当前歌词
      tit: document.title,
    };
  },
  computed: {
    songDetail() {
      //这里还没那带数据
      if (this.$store.state.SongDetail.time != 0) {
        this.showStart = true;
      }
      return JSON.parse(localStorage.getItem("SongDetail"));
    },
  },
  mounted() {
    this.TitleScrolling();
  },
  watch: {
    songDetail: {
      //如果想打开就有缓存就要立即监听
      handler() {
        for (const key in this.songDetail) {
          this[key] = this.songDetail[key];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    //转换秒
    milltosecond(val) {
      return millisToMinutesAndSeconds(val);
    },
    //暂停
    end() {
      this.showStart = !this.showStart;
      this.playing = true;
      this.$refs.audio.pause();
    },
    //播放
    start() {
      this.showStart = !this.showStart;
      this.playing = false;
      this.$refs.audio.play();
    },
    // 快进，快退
    editTime(val) {
      this.$refs.audio.currentTime = val / 1000;
    },
    //调节声音
    editVol(val) {
      this.$refs.audio.volume = val / 100;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      //同步歌词
      if (this.lyric.length != 0) {
        if (
          this.currentLyric != this.lyric.length &&
          this.lyric[this.currentLyric]
        ) {
          if (this.lyric[this.currentLyric][0] < this.SongTime) {
            this.currentLyric++;
            this.$store.state.currentLyric = this.currentLyric;
            this.lyricText = this.lyric[this.currentLyric - 1][1];
          }
        }
      }
      if (this.$refs.audio.currentTime) {
        if (
          parseInt(this.time) == parseInt(this.$refs.audio.currentTime * 1000)
        ) {
          this.SwitchSongs("next");
        }
        this.SongTime = this.$refs.audio.currentTime * 1000;
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    async onLoadedmetadata(res) {
      this.time = parseInt(res.target.duration * 1000);
      // this.showStart=true
      if (!this.$refs.audio.paused) {
        this.showStart = true;
      }

      this.playing = true;
      this.tit = ` 正在播放：${this.name} - ${
        this.onesong.ar ? this.onesong.ar[0].name : this.onesong.artists[0].name
      }  `;
      if (this.onesong.id) {
        this.getLyric(this.onesong.id);
        this.lyric = [];
      }
    },
    //切换歌曲
    SwitchSongs(val) {
      this.$store.dispatch("SwitchSong", val);
    },
    TitleScrolling() {
      setInterval(() => {
        //ES6箭头函数
        // 截取首字符串(第一个)
        var head = this.tit.substring(0, 1);
        // 截取除首字符串外所有字符串(除第一个所有)
        var foot = this.tit.substring(1);
        // 头尾拼接后赋给data => tit属性
        this.tit = foot + head;
        // 最后赋给最终显示的标题(标题)
        document.title = this.tit;
      }, 800);
    },
    getLikeMusic(val) {
      console.log(val);
    },
    download() {
      this.$store.dispatch("DownLoadMusic", this.onesong.id);
    },
    async getLyric(id) {
      //获取歌词
      this.currentLyric = 0;
      var res = await SongLyric(id);
      if (!res.lrc) {
        this.$message({
          message: "抱歉，暂无歌词!",
          type: "warning",
        });
        this.lyricText = "";
        return;
      }
      res = res.lrc.lyric.split("\n");
      var lyric = {};
      let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
      res.map((val, index) => {
        var val = val.replace(/\s*/, "");
        var time = val.replace(pattern, "");
        var lyr = val.match(pattern);
        if (lyr == null) {
          lyr = ["[00:00.000]"];
        }
        lyric[index] = [...lyr, time];
      });
      for (const key in lyric) {
        let ly = lyric[key][0];
        const m = parseInt(ly.slice(1, 3));
        const s = parseInt(ly.slice(4, 6));
        const ms = parseInt(ly.slice(7, 10));
        lyric[key][0] = m * 60 * 1000 + s * 1000 + ms;
      }
      this.lyric = lyric;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 75%;
  height: 50px;
  margin: 0 auto;
  li {
    list-style: none;
  }
  display: flex;

  .btn {
    flex: 3;
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      flex: 1;
      color: #666666;
    }
    span:hover {
      color: #b7b4b4;
    }
  }
  .pic {
    flex: 1;
    display: flex;
    margin: 0 auto;
    align-items: center;
  }
  .border {
    display: flex;
    flex: 15;
    align-items: center;
    margin: auto 0rem;

    .title {
      flex: 1;
      color: #939090;
      font-size: 12rem;
      font-weight: blod;
      //下面控制最多两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .slider {
      flex: 6;
      width: 100%;
      margin: 0 0 0 10rem;
      position: relative;
      .songer {
        position: absolute;
        color: #939090;
        font-size: 12rem;
        font-weight: blod;
        top: -5rem;
        padding-top: 10rem;

        span {
          padding-right: 20rem;
          color: #939090;
        }
        span:hover {
          color: #b7b4b4;
        }
      }
      .slider_detail {
        padding-top: 10rem;
        width: 100%;
      }
    }
    /deep/ .el-slider__bar {
      height: 6rem;
      background-color: #666 !important;
      border-top-left-radius: 3rem;
      border-bottom-left-radius: 3rem;
    }
    /deep/.el-slider__button {
      width: 16rem;
      height: 16rem;
      border: 2rem solid #666;
      background-color: #fff;
      border-radius: 50%;
      transition: 0.2s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .time {
    color: #fff;
    flex: 2;
    margin: auto 0rem;
    font-size: 13rem;
  }
  .other {
    flex: 1;
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    width: 200rem;
    justify-content: space-between;
    .playlist {
      padding: 0 10rem 0 0;
      font-size: 25px;
      flex: 1;
      text-align: left;
      color: #666666;
      position: relative;
      z-index: 1000000000000;
      .listdata {
        border-radius: 10rem 10rem 0 0;
        width: 410rem;
        height: 280rem;
        background-color: #1f1f1f;
        position: absolute;
        top: -290rem;
        left: -200rem;
        color: #000;
        overflow: auto;
        padding: 0 10rem;
      }
      .listdata::-webkit-scrollbar {
        width: 1rem;
      }
    }
    .playlist:hover {
      cursor: pointer;
      color: #b7b4b4;
    }
    .love {
      padding: 0 10rem 0 0;
      font-size: 22px;
      flex: 1;
      color: #666666;
    }
    .down {
       padding: 0 10rem 0 10rem;
      font-size: 20px;
      flex: 1;
      color: #666666;
    }
    .down:hover {
      cursor: pointer;
      color: #b7b4b4;
    }
    .love:hover {
      cursor: pointer;
      color: #b7b4b4;
    }
    .volume {
      font-size: 16px;
      flex: 1;
      position: relative;
      z-index: 100000000000;
      .slider {
        position: absolute;
        z-index: 10000000;
        top: -92rem;
        width: 40rem;
        left: -10rem;
        background-color: #2d2c2c;
        opacity: 0.8;
        border-top-left-radius: 5rem;
        border-top-right-radius: 5rem;
      }
      .svg {
        cursor: pointer;
        color: #666666;
      }
    }

    .svg:hover {
      color: #b7b4b4;
    }

    /deep/ .el-slider__bar {
      height: 6rem;
      background-color: #666 !important;
    }
    /deep/.el-slider__button {
      width: 12rem;
      height: 1rem;
      visibility: hidden;
      border: 1rem solid #666;
      background-color: #fff;
      // border-radius: 50%;
      transition: 0.2s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>