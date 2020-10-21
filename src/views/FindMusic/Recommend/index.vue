<!--
 * @Descripttion: 推荐详情
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:07
 * @LastEditTime: 2020-10-21 10:22:57
-->
<template>
  <div class="content">{{this.$store.state.BannerUrl}}
    <div class="content_carousel">
      <el-carousel>
        <el-carousel-item
          v-for="(item, index) in bannerImgs"
          :key="index"
          :style="bannerStyle(item)"
        >
          <img :src="item.imageUrl" />
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
  computed: {},
  mounted() {
    this.requireBanner();
  },
  methods: {
    bannerStyle(val) {
      return {
        "background-image": `url(${val.imageUrl + "?imageView&blur=40x20"})`,
        "background-size": "6000px",
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
  .el-carousel {
  }
  .content_song {
    margin: 0 auto;
    text-align: center;
    background-color: #ffffff;
    width: 1080px;
    height: 100%;
  }
}
</style>