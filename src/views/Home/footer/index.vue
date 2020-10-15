<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 19:41:46
 * @LastEditTime: 2020-10-15 17:19:02
-->
<template>
  <div class="content">
    <div class="btn">
      <span> <svg-icon style="font-size: 1.5em" icon-class="上一首" /></span
      ><span><svg-icon style="font-size: 2.5em" icon-class="开始" /></span
      ><span> <svg-icon style="font-size: 1.5em" icon-class="下一首" /></span>
    </div>
    <div class="pic">
      <svg-icon style="font-size: 2.5em" icon-class="网易云" />
    </div>
    <div class="border">
      <el-slider
        :max="maxTime"
        :show-tooltip="false"
        v-model="SongTime"
      ></el-slider>
    </div>
    <div class="time">
      {{ milltosecond(SongTime) }}/{{ milltosecond(maxTime) }}
    </div>
    <div class="other">
      <!-- <svg-icon style="font-size: 1.2em;padding:0 10px" icon-class="喜欢" /> -->
      <svg-icon  style="font-size: 1.5em" icon-class="喇叭广播" />
    </div>
  </div>
</template>

<script>
import { millisToMinutesAndSeconds } from "@/api/index";

export default {
  data() {
    return { SongTime: 1, maxTime: 162215 };
  },
  methods: {
    milltosecond(val) {
      return millisToMinutesAndSeconds(val);
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
      // margin: 0 5px;
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
    flex: 15;
    margin: auto 10px;
    /deep/ .el-slider__bar {
      height: 6px;
      background-color: #666 !important;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      position: absolute;
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
    // padding: 10px;
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
  }
}
</style>