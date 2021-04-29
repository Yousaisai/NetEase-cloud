<!--
 * @Descripttion: 新碟上架导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:06:59
 * @LastEditTime: 2021-04-29 11:32:25
-->
<template>
  <div class="content">
    <div class="hot">
      <div class="title">新碟上架</div>
      <el-divider direction="horizontal"></el-divider>
      <div class="hotimg">
        <div class="item" v-for="(item, index) in hotMonthData" :key="index">
          <router-link :to="{ path: 'NewAlbum', query: { id: item.id } }">
            <div class="img">
              <el-image
                :src="item.picUrl + '?param=150y150'"
                fit="fill"
                :lazy="true"
              ></el-image></div
          ></router-link>

          <div class="name">
            <div class="alname">{{ item.name }}</div>
            <div class="songname">{{ item.artist.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="all">
      <div class="title">
        <span style="padding-right: 20rem">全部新碟 </span>
        <span @click="getnewAllAlbum(item)" class="span" v-for="(item, index) in area" :key="index"
          >{{ index }} <span class="line">|</span>
        </span>
      </div>
      <el-divider direction="horizontal"></el-divider>
      <div class="allimg">
        <div class="item" v-for="(item, index) in allMonthData" :key="index">
          <router-link :to="{ path: 'NewAlbum', query: { id: item.id } }">
            <div class="img">
              <el-image
                :src="item.picUrl + '?param=150y150'"
                fit="fill"
                :lazy="true"
              ></el-image></div
          ></router-link>

          <div class="name">
            <div class="alname">{{ item.name }}</div>
            <div class="songname">{{ item.artist.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { newTopAlbum, newAlbum } from "@/api/index";
export default {
  data() {
    return {
      newTopAlbumPapload: {
        area: "ALL",
        type: "new",
        limit: 66,
      },
      area: {"全部":"ALL", "华语":"ZH", "欧美":"", "韩国":"KR", "日本":"JP"},
      allMonthData: [],
      hotMonthData: [],
    };
  },
  mounted() {
    this.getnewAllAlbum(), this.getnewHotAlbum();
  },
  methods: {
    async getnewAllAlbum(val) {
      if (val) {
        this.newTopAlbumPapload.area=val
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
  flex-direction: column;

  .img:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  .el-divider {
    // padding: 0.5rem;
    margin-top: 10rem;
  }
  .hot {
    display: flex;
    flex-direction: column;
    .title {
      text-align: left;
      font-size: 25rem;
    }
    .hotimg {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      .item {
        width: 16%;
        .img {
          padding: 10rem;
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
  }

  .all {
    padding: 10rem 0;
    margin-top: 20rem;
    display: flex;
    flex-direction: column;
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
      justify-content: space-between;
      .item {
        width: 16%;
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