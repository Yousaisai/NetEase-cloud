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
 * @LastEditTime: 2020-10-15 21:55:19
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
      <span> <svg-icon style="font-size: 1.5em" icon-class="上一首" /></span
      ><span>
        <svg-icon
          v-if="showStart"
          style="font-size: 2.5em"
          @click="end"
          icon-class="暂停" />
        <svg-icon
          v-if="!showStart"
          @click="start"
          style="font-size: 2.5em"
          icon-class="开始 (1)" /></span
      ><span> <svg-icon style="font-size: 1.5em" icon-class="下一首" /></span>
    </div>
    <div class="pic">
      <svg-icon v-if="!cover" style="font-size: 2.5em" icon-class="网易云" />
      <el-image
        v-if="cover"
        style="width: 35px; border-radius: 30%; height: 35px"
        :src="cover"
        :lazy="true"
      ></el-image>
    </div>
    <div class="border">
      <div class="title">{{ name }}</div>
      <div class="slider">
        <el-slider
          :max="time"
          @change="editTime"
          :show-tooltip="false"
          v-model="SongTime"
        ></el-slider>
      </div>
    </div>
    <div class="time">
      {{ milltosecond(SongTime) }}/{{ milltosecond(time) }}
    </div>
    <div class="other">
      <div class="volume">
        <div
          :style="{ visibility: showVol == false ? 'hidden' : 'visible' }"
          class="slider"
        >
          <el-slider
            v-model="volume"
            :show-tooltip="false"
            vertical
            height="100px"
            @change="editVol"
          >
          </el-slider>
        </div>
        <div class="svg" @click="showVol = !showVol">
          <svg-icon style="font-size: 1.5em" icon-class="喇叭广播 (1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { millisToMinutesAndSeconds } from "@/api/index";

export default {
  data() {
    return {
      SongTime: 0,
      volume: 50, //声音
      showVol: false,
      showStart: false,
      url: "", //音乐Url
      name: "Music", //音乐名
      cover: "", //音乐封面
      time: 100, //音乐时间，传入的数字是毫秒级
      album: "", //音乐专辑
      playing: false, //音频是否在播放
    };
  },
  computed: {
    songDetail() {
      if (this.$store.state.SongDetail.time != 0) {
        this.showStart = true;
        return this.$store.state.SongDetail;
      }
    },
  },
  watch: {
    songDetail() {
      for (const key in this.songDetail) {
        this[key] = this.songDetail[key];
      }
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
      console.log(this.$refs.audio.currentTime);
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
      console.log(this.SongTime / 1000);
    },
    //调节声音
    editVol(val) {
      this.$refs.audio.volume = val / 100;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.SongTime = this.$refs.audio.currentTime * 1000;
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  // font-size: 2em;
  width: 75%;
  height: 100%;
  margin: 0 auto;

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
    align-items: center;
  }

  .border {
    display: flex;
    flex: 15;
    align-items: center;
    // flex-direction: column;
    margin: auto 0px;

    .title {
      flex: 1;
      color: #939090;
      font-size: 12px;
      font-weight: blod;
    }
    .slider {
      flex: 6;
      width: 100%;
      margin: 0 0 0 10px;
    }
    /deep/ .el-slider__bar {
      height: 6px;
      background-color: #666 !important;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    /deep/.el-slider__button {
      width: 16px;
      height: 16px;
      border: 2px solid #666;
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
    margin: auto 0px;
    font-size: 13px;
  }
  .other {
    flex: 3;
    color: #fff;
    margin: auto 10px;
    position: relative;
    .volume {
      position: absolute;
      top: -125px;
      z-index: 1000000;
    }

    .svg {
      cursor: pointer;
      padding: 10px;
      top: 0;
      color: #666666;
    }
    .svg:hover {
      color: #b7b4b4;
    }
    .slider {
      width: 40px;

      background-color: #2d2c2c;
      opacity: 0.8;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    /deep/ .el-slider__bar {
      height: 6px;
      background-color: #666 !important;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    /deep/.el-slider__button {
      width: 16px;
      height: 16px;
      border: 2px solid #666;
      background-color: #fff;
      border-radius: 50%;
      transition: 0.2s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>