<!--
 * @Descripttion: 歌曲评论，只需要传来评论参数
 * @Author: Mr.You
 * @Date: 2020-10-22 11:13:17
 * @LastEditTime: 2020-10-22 17:01:29
-->
<template>
  <div class="comcontent">
    <div class="totle">
      <span style="font-size: 22px; padding-right: 10px">评论</span>
      <span>共{{ comment.total }}条评论</span>
      <el-divider direction="horizontal" content-position="left"></el-divider>
      <div class="comment">
        <div class="avt">
          <svg-icon
            style="font-size: 3em; color: #99b5d7"
            icon-class="用户 (1)"
          />
        </div>
        <div class="textarea">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="com">
      <span
        ><el-button type="primary" size="mini" plain>发表评论</el-button></span
      >
    </div>
    <div class="hotCom">
      <span style="color: #9b0909; font-size: 12px; font-weight: bold"
        >精彩评论</span
      >
      <el-divider direction="horizontal"></el-divider>

      <div
        class="comItem"
        v-for="(item, index) in comment.hotComments"
        :key="index"
      >
        <div class="avt">
          <el-image
            style="border-radius: 50%"
            :src="item.user.avatarUrl + '?param=50y50'"
            fit="fill"
            :lazy="true"
          ></el-image>
        </div>
        <div class="comten">
          <div class="con">
            <div class="title">
              <span style="color: #409eff"
                >{{ item.user.nickname }}

                <svg-icon
                  v-show="item.user.vipType > 10"
                  style="font-size: 1.2em"
                  icon-class="vip (1)"
                />
                ：</span
              ><span>{{ item.content }}</span>
            </div>
            <div class="reply" v-show="item.beReplied.length > 0">
              <div v-for="(item1, index1) in item.beReplied" :key="index1">
                <span style="color: #409eff"
                  >{{ item1.user.nickname }}

                  <svg-icon
                    v-show="item1.user.vipType > 10"
                    style="font-size: 1.2em"
                    icon-class="vip (1)"
                  />
                  ：</span
                ><span>{{ item.content }}</span>
              </div>
            </div>
          </div>

          <div class="like">
            <div class="time">{{ formData(item.time) }}</div>
            <div class="likenum">
              <svg-icon icon-class="点赞" style="color: 409eff" />
              <span
                style="border-right: 2px solid #99b5d7; padding-right: 10px"
              >
                ({{ item.likedCount }})</span
              >
              <span style="padding-left: 10px">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="newCom">
      <span style="color: #9b0909; font-size: 12px; font-weight: bold"
        >最新评论</span
      >
      <el-divider direction="horizontal"></el-divider>

      <div
        class="comItem"
        v-for="(item, index) in comment.comments"
        :key="index"
      >
        <div class="avt">
          <el-image
            style="border-radius: 50%"
            :src="item.user.avatarUrl + '?param=50y50'"
            fit="fill"
            :lazy="true"
          ></el-image>
        </div>
        <div class="comten">
          <div class="con">
            <div class="title">
              <span style="color: #409eff"
                >{{ item.user.nickname }}

                <svg-icon
                  v-show="item.user.vipType > 10"
                  style="font-size: 1.2em"
                  icon-class="vip (1)"
                />
                ：</span
              ><span>{{ item.content }}</span>
            </div>
            <div class="reply" v-show="item.beReplied.length > 0">
              <div v-for="(item1, index1) in item.beReplied" :key="index1">
                <span style="color: #409eff"
                  >{{ item1.user.nickname }}

                  <svg-icon
                    v-show="item1.user.vipType > 10"
                    style="font-size: 1.2em"
                    icon-class="vip (1)"
                  />
                  ：</span
                ><span>{{ item.content }}</span>
              </div>
            </div>
          </div>

          <div class="like">
            <div class="time">{{ formData(item.time) }}</div>
            <div class="likenum">
              <svg-icon icon-class="点赞" style="color: 409eff" />
              <span
                style="border-right: 2px solid #99b5d7; padding-right: 10px"
              >
                ({{ item.likedCount }})</span
              >
              <span style="padding-left: 10px">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Comment, dataType } from "@/api/index";
export default {
  props: ["commentData"],
  computed: {
    comment() {
      return JSON.parse(this.commentData);
    },
  },
  data() {
    return { textarea: "" };
  },
  methods: {
    formData(val) {
      return dataType(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.comcontent {
  .el-divider {
    margin: 10px 0;
  }
  width: 1020px;
  background-color: #fff;
  text-align: left;
  padding: 10px 30px;
  span {
    font-size: 12px;
    line-height: 20px;
  }
  .comment {
    padding: 10px 0px 10px 10px;
    display: flex;
    .avt {
      flex: 1;
    }
    .textarea {
      flex: 15;
    }
  }
  .com {
    text-align: right;
    padding-right: 10px;
    padding-bottom: 10px;
  }
  .newCom {
    padding: 20px 0;
  }
  .hotCom,
  .newCom {
    .comItem {
      display: flex;
      border-bottom: 1px dashed #dcdfe6;
      padding: 10px;
      .avt {
        flex: 1;
        font-weight: bold;
      }

      .comten {
        flex: 15;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .con {
          padding: 0 0 10px 0;
          .title {
          }

          .reply {
            position: relative;
            background-color: #f5f5f5;
            padding: 10px 20px;
            margin: 10px;
          }
          .reply:before {
            content: "";
            width: 0px;
            border-top: 10px solid transparent;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #f4f5f7;
            position: absolute;
            top: -18px;
            border-radius: 3px;
            left: 20px;
          }
        }

        .like {
          padding: 10px 0 0 0;
          display: flex;
          width: 100%;
          .time {
            justify-self: start;
            flex: 1;
            font-size: 10px;
            color: #99b5d7;
          }
          .likenum {
            cursor: pointer;
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }

  .newCom {
    .comItem {
      .avt {
      }

      .comten {
        .title {
        }

        .reply {
        }
      }
    }
  }
}
</style>