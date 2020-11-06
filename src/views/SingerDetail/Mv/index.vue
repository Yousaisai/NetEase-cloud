<!--
 * @Descripttion: 单曲列表
 * @Author: Mr.You
 * @Date: 2020-10-21 09:55:07
 * @LastEditTime: 2020-10-22 10:02:48
-->
<template>
  <div class="cotent">
    <div class="item" v-for="(item, index) in mvs" :key="index">
      <div class="mv">
        <router-link
          :to="{
            path: '/PlayMv',
            query: { mvid: item.id },
          }"
          ><div class="play"><svg-icon icon-class="开始 (1)" /></div>
          <el-image :src="item.imgurl" fit="fill" :lazy="true"></el-image
        ></router-link>
      </div>
      <div class="mvname">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { SingersMv } from "@/api/index";
export default {
  props: ["id"],
  data() {
    return {
      mvs:[]
    };
  },
  computed: {},

  mounted() {
    this.getSingersMv();
  },

  methods: {
    async getSingersMv() {
      var id=this.$route.query
      var res = await SingersMv(id);
      this.mvs=res.mvs
    },
  },
};
</script>
<style lang="scss" scoped>
.cotent {
  width: 1080rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10rem;
    width: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    position: relative;
    -webkit-box-orient: vertical;
    .play {
      color: #b7b4b4;
      position: absolute;
      z-index: 100000;
      font-size: 35rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .play:hover {
      color: #cccccc;
    }
    .mv {
      cursor: pointer;
      el-image {
      }
    }

    .mvname {
      width: 85%;
      margin: 0 auto;
      font-size: 13rem;
    }
  }
}
</style>