<!--
 * @Descripttion: 推荐详情
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:07
 * @LastEditTime: 2021-04-29 11:13:48
-->
<template>
  <div class="content">{{this.$store.state.BannerUrl}}
    <div class="content_carousel">
      <el-carousel >
        <el-carousel-item
          v-for="(item, index) in bannerImgs"
          :key="index"
          :style="bannerStyle(item)"
        >
        <router-link
        style="text-decoration: none"
        :to="{ path: '/PlayDetail', query: { id: item.targetId } }"
      >  <img style="width:1080rem" :src="item.imageUrl" /></router-link>
        
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content_song"><play-list></play-list></div>
  </div>
</template>





<script>
import { banner } from "@/api/index";
import playList from "./playList";
export default {
  components: {
    playList,
  },
  data() {
    return {
      //轮播图
      bannerImgs: [],
    };
  },
  mounted() {
    this.requireBanner();
  },
  methods: {
    bannerStyle(val) {
      return {
        "background-image": `url(${val.imageUrl + "?imageView&blur=40x20"})`,
        "background-size": "6000rem",
        "background-position": "center center",
      };
    },
    async requireBanner() {
      var res = await banner();
      this.bannerImgs = res.banners;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .content_song {
    margin: 0 auto;
    text-align: center;
    background-color: #ffffff;
    width: 1080rem;
    height: 100%;
  }
}
</style>