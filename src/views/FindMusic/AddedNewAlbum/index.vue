<!--
 * @Descripttion: 新碟上架导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:06:59
 * @LastEditTime: 2020-10-22 18:17:27
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
        <span style="padding-right: 20px">全部新碟 </span>
        <span @click="getnewAllAlbum(item)" class="span" v-for="(item, index) in type" :key="index"
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
      type: {"全部":"ALL", "华语":"ZH", "欧美":"", "韩国":"KR", "日本":"JP"},
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
        this.newTopAlbumPapload.type=val
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
  width: 1080px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .img:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  .el-divider {
    // padding: 0.5px;
    margin-top: 10px;
  }
  .hot {
    display: flex;
    flex-direction: column;
    .title {
      text-align: left;
      font-size: 25px;
    }
    .hotimg {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      .item {
        width: 16%;
        .img {
          padding: 10px;
        }

        .name {
          font-size: 13px;
          .alname {
            padding: 5px;
          }
          .songname {
          }
        }
      }
    }
  }

  .all {
    padding: 10px 0;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .title {
      text-align: left;

      font-size: 25px;

      .span {
        font-size: 13px;
        // padding: 15px;
        .line {
          padding: 10px;
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
          padding: 10px;
        }
      }
    }
    .name {
      font-size: 13px;
      .alname {
        padding: 5px;
      }
      .songname {
      }
    }
  }
}
</style>