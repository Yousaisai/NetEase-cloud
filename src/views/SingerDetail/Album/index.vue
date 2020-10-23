<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-18 16:29:21
 * @LastEditTime: 2020-10-22 18:18:46
-->
<template>
  <div class="content">
    <div class="item" v-for="(item, index) in hotAlbums" :key="index">
      <div class="img">
        <router-link :to="{ path: '/NewAlbum', query: { id: item.id } }">
          <el-image
            :src="item.picUrl + '?param=500y500'"
            fit="fill"
            :lazy="true"
          ></el-image
        ></router-link>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { SingersAlbum } from "@/api/index";
export default {
  props: ["id"],
  data() {
    return {
      SingersAlbumPayload: {
        id: this.id.id,
      },
      hotAlbums: [],
    };
  },
  mounted() {
    this.getSingersAlbum();
  },
  methods: {
    async getSingersAlbum() {
      var res = await SingersAlbum(this.SingersAlbumPayload);
      this.hotAlbums = res.hotAlbums;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
 
  .item {
    width: 18%;
    padding: 10px 10px;
    .img {
    }
    .img:hover {
      cursor: pointer;
      transform: scale(1.02);
    }
    .name {
      padding: 10px;
    }
  }
}
</style>