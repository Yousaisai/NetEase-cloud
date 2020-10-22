<!--
 * @Descripttion: 歌手导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:08
 * @LastEditTime: 2020-10-21 20:16:52
-->
<template>
  <div class="content">
 
    <div class="singers">
      <div class="leadersinger">
        <div class="singer" v-for="(item, index) in searchRe.artists" :key="index">
          <div class="img10" >
            <div class="img">
              <router-link
                :to="{ path: '/SingerDetail/Music', query: { id: item.id } }"
              >
                <el-image
             
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
         
        </div>
      </div>
      <div class="othersinger"></div>
    </div>
  </div>
</template>





<script>
import { CatSingers, SingerLeader } from "@/api/index";
export default {
  props:["searchRe"],

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