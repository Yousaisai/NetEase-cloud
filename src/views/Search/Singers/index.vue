<!--
 * @Descripttion: 歌手导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:08
 * @LastEditTime: 2020-12-02 17:05:28
-->
<template>
  <div class="content">
    <div class="singers">
      <div class="leadersinger">
        <div
          class="singer"
          v-for="(item, index) in searchRe.artists"
          :key="index"
        >
          <div class="img10">
            <div class="img">
              <router-link
                :to="{ path: '/SingerDetail/Music', query: { id: item.id } }"
              >
                <el-image
                  style="border-radius: 50%; width: 150rem; height: 150rem"
                  :src="item.picUrl"
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
        </div>
      </div>
      <div class="othersinger"></div>
    </div>
  </div>
</template>





<script>
import { CatSingers, SingerLeader } from "@/api/index";
export default {
  props: ["searchRe"],
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 1080rem;
  margin: 0 auto;
  padding: 10rem;
  background-color: #fff;
  color: #939090;
  // margin: auto 0;
  .abcleader {
    text-align: left;
    padding: 20rem 10rem;
    span {
      cursor: pointer;
      padding: 8rem 12rem;
      width: 12rem;
      height: 12rem;
    }
    span:hover {
      color: #b7b4b4;
      // transform: scale(1.2);
    }
    .active {
      background-color: #b21212;
      color: #fff;
      border-radius: 14rem;
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
        padding: 10rem;
        .img,
        .img11:hover {
          transform: scale(1.15);
          cursor: pointer;
        }
        width: 17%;
        .img10 {
          color: #b7b4b4;
          font-weight: 500;
          padding: 0 0 10rem 0;
          .img {
            padding: 20rem 0;
          }
          .img :hover {
            transform: scale(1.05);
            cursor: pointer;
          }
          .detail {
            .title {
              color: black;
              font-size: 15rem;
            }
            .num {
              font-size: 12rem;
              padding: 5rem;
            }
          }
        }
        .img11 {
          font-size: 10rem;
          display: flex;
          align-items: center;
          padding: 0 10rem 0 50rem;
          .img {
            padding: 0 10rem 0 0rem;
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