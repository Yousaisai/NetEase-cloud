<!--
 * @Descripttion: 歌手导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:08
 * @LastEditTime: 2020-10-22 18:17:36
-->
<template>
  <div class="content">
    <div class="abcleader">
      索引：
      <span
        @click="getCatSings(item)"
        :class="isActive == item ? 'active' : 'none'"
        v-for="item in initial"
        :key="item"
        >{{ item }}</span
      >
    </div>
    <div class="abcleader">
      类型：
      <span
        :class="isActive1 == index ? 'active' : 'none'"
        @click="getCatSings(index)"
        v-for="(item, index) in type"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div class="abcleader">
      地区：
      <span
        :class="isActive2 == index ? 'active' : 'none'"
        @click="getCatSings(index)"
        v-for="(item, index) in area"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div class="singers">
      <div class="leadersinger">
        <div class="singer" v-for="(item, index) in singers" :key="index">
          <div class="img10" v-if="index < 10">
            <div class="img">
              <router-link
                :to="{ path: '/SingerDetail/Music', query: { id: item.id } }"
              >
                <el-image
                  @click="getOneSinger(item)"
                  style="border-radius: 50%"
                  :src="item.picUrl + '?param=150y150'"
                  fit="fill"
                  :lazy="true"
                ></el-image
              ></router-link>
            </div>
            <div class="detail">
              <div class="title">{{ item.name }}</div>
              <div class="num">{{ item.musicSize }} 首歌曲</div>
            </div>
          </div>
          <div class="img11" v-if="index >= 10">
            <div class="img">
              <router-link
                :to="{ path: '/SingerDetail/Music', query: { id: item.id } }"
              >
                <el-image
                  @click="getOneSinger(item)"
                  style="border-radius: 50%"
                  :src="item.picUrl + '?param=35y35'"
                  fit="fill"
                  :lazy="true"
                ></el-image
              ></router-link>
            </div>
            <div class="detail">
              <div class="title">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="othersinger"></div>
    </div>
  </div>
</template>





<script>
import { CatSingers, SingerLeader } from "@/api/index";
export default {
  data() {
    return {
      isActive: "热门",
      isActive1: 0,
      isActive2: 5,
      initial: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      type: {
        0: "全部",
        1: "男歌手",
        2: "女歌手",
        3: "乐队",
      },
      area: {
        5: "全部",
        7: "华语",
        96: "欧美",
        8: "日本",
        16: "韩国",
        22: "其他",
      },
      CatSingersPayload: {
        limit: "",
        offset: "",
        initial: -1,
        type: -1,
        area: -1,
      },
      singers: {},
    };
  },
  mounted() {
    this.getSingerLeader();
  },
  methods: {
    async getSingerLeader() {
      var res = await SingerLeader();
      res = res.list.artists;
      this.singers = res;
    },

    async getCatSings(val) {
      /**
       * initial:-1热门 0其他 字母
       * type:-1:全部 1:男歌手 2:女歌手 3:乐队
       * area: -1:全部 7华语 96欧美 8:日本 6韩国 0:其他
       * 默认热门 全部 全部
       */
      if (val == "热门") {
        this.isActive = val;
        this.CatSingersPayload.initial = -1;
      } else if (val == "#") {
        this.isActive = val;
        this.CatSingersPayload.initial = 0;
      } else if (val == 0) {
        this.isActive1 = val;
        this.CatSingersPayload.type = -1;
      } else if (val == 1) {
        this.isActive1 = 1;
        this.CatSingersPayload.type = 1;
      } else if (val == 2) {
        this.isActive1 = 2;
        this.CatSingersPayload.type = 2;
      } else if (val == 3) {
        this.isActive1 = 3;
        this.CatSingersPayload.type = 3;
      } else if (val == 5) {
        this.isActive2 = val;
        this.CatSingersPayload.area = -1;
      } else if (val == 7) {
        this.isActive2 = val;
        this.CatSingersPayload.area = 7;
      } else if (val == 96) {
        this.isActive2 = val;
        this.CatSingersPayload.area = 96;
      } else if (val == 8) {
        this.isActive2 = val;
        this.CatSingersPayload.area = 8;
      } else if (val == 16) {
        this.isActive2 = val;
        this.CatSingersPayload.area = 16;
      } else if (val == 22) {
        this.isActive2 = val;
        this.CatSingersPayload.area = 0;
      } else {
        this.isActive = val;
        this.CatSingersPayload.initial = val;
      }
      var res = await CatSingers(this.CatSingersPayload);
      this.singers = res.artists;
    },
    async getOneSinger(item) {
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  color: #939090;
  // margin: auto 0;
  .abcleader {
    text-align: left;
    padding: 20px 10px;
    span {
      cursor: pointer;
      padding: 8px 12px;
      width: 12px;
      height: 12px;
    }
    span:hover {
      color: #b7b4b4;
      // transform: scale(1.2);
    }
    .active {
      background-color: #b21212;
      color: #fff;
      border-radius: 14px;
    }
    span:active {
      // color: yellow;
    }
  }

  .catleader0 {
    span {
      flex: 1;
      cursor: pointer;
    }
    span:hover {
      transform: scale(1.2);
      color: #b7b4b4;
    }
    span:active {
      color: #9b0909;
    }
  }

  .singers {
    flex: 8;
    .leadersinger {
      display: flex;
      justify-content: space-around;
      // text-align: center;
      flex-wrap: wrap;
      .singer {
        padding: 10px;
        .img,
        .img11:hover {
          transform: scale(1.15);
          cursor: pointer;
        }
        width: 17%;
        .img10 {
          color: #b7b4b4;
          font-weight: 500;
          padding: 0 0 10px 0;
          .img {
            padding: 20px 0;
          }
          .img :hover {
            transform: scale(1.05);
            cursor: pointer;
          }
          .detail {
            .title {
              color: black;
            }
            .num {
              font-size: 12px;
              padding: 5px;
            }
          }
        }
        .img11 {
          font-size: 10px;
          display: flex;
          align-items: center;
          padding: 0 10px 0 50px;
          .img {
            padding: 0 10px 0 0px;
          }
          .detail {
          }
        }
      }
    }

    .othersinger {
    }
  }
}
</style>