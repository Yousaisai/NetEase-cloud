<!--
 * @Descripttion: 新碟上架导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:06:59
 * @LastEditTime: 2020-10-22 18:18:38
-->
<template>
  <div class="content">
    <div class="all">
      <div class="allimg">
        <div class="item" v-for="(item, index) in searchRe.albums" :key="index">
          <router-link :to="{ path: '/NewAlbum', query: { id: item.id } }">
            <div class="img">
              <el-image
                :src="item.picUrl + '?param=250y250'"
                fit="fill"
                :lazy="true"
              ></el-image></div
          ></router-link>

          <div class="name">
            <div class="alname">{{ item.name }}</div>
            <!-- <div class="songname">{{ item.artist.name }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { newTopAlbum, newAlbum } from "@/api/index";
export default {
  props: ["searchRe"],
  data() {
    return {
      newTopAlbumPapload: {
        area: "ALL",
        type: "new",
        limit: 66,
      },
      type: { 全部: "ALL", 华语: "ZH", 欧美: "", 韩国: "KR", 日本: "JP" },
      allMonthData: [],
      hotMonthData: [],
    };
  },
  mounted() {
    // this.getnewAllAlbum(), this.getnewHotAlbum();
  },
  methods: {
    async getnewAllAlbum(val) {
      if (val) {
        this.newTopAlbumPapload.type = val;
    
      }
      var res = await newTopAlbum(this.newTopAlbumPapload);
      this.allMonthData = res.monthData;
    },
    async getnewHotAlbum() {
      var res = await newAlbum();

      this.hotMonthData = res.albums;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
width: 1080rem;
  margin: 0 auto;
  padding: 20rem;
  background-color: #fff;
  display: flex;

  .img:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  .all {
    // padding: 10rem 0;
    // margin-top: 20rem;
    display: flex;
   justify-content: center;
    flex-wrap: wrap;
    .title {
      text-align: left;

      font-size: 25rem;

      .span {
        font-size: 13rem;
        // padding: 15rem;
        .line {
          padding: 10rem;
          color: #666;
        }
      }
      .span:hover {
        cursor: pointer;
        color: #909399;
      }
    }
    .allimg {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      // justify-content: space-between;
      .item {
        width: 20%;
        .img {
          padding: 10rem;
        }
      }
    }
    .name {
      font-size: 13rem;
      .alname {
        padding: 5rem;
      }
      .songname {
      }
    }
  }
}
</style>