<!--
 * @Descripttion: 歌曲评论，只需要传来评论参数
 * @Author: Mr.You
 * @Date: 2020-10-22 11:13:17
 * @LastEditTime: 2020-10-25 16:30:09
-->
<template>
  <div class="comcontent">
    <div class="totle">
      <span style="font-size: 22px; padding-right: 10px">评论</span>
      <span>共{{ commentdatas.total }}条评论</span>
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
        ><el-button type="primary" @click="PutComment" size="mini" plain
          >发表评论</el-button
        ></span
      >
    </div>
    <div
      class="hotCom"
      v-if="commentdatas.hotComments && commentdatas.hotComments.length > 0"
    >
      <span style="color: #9b0909; font-size: 12px; font-weight: bold"
        >精彩评论</span
      >
      <el-divider direction="horizontal"></el-divider>

      <div
        class="comItem"
        v-for="(item, index) in commentdatas.hotComments"
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
                ><span>{{ item1.content }}</span>
              </div>
            </div>
          </div>

          <div class="like">
            <div class="time">{{ formData(item.time) }}</div>
            <div class="likenum">
              <svg-icon
                @click="like(item)"
                :icon-class="item.liked ? '点赞' : '点赞 (1)'"
                style="color: #409eff"
              />
              <span
                style="border-right: 2px solid #99b5d7; padding-right: 10px"
              >
                ({{ item.likedCount }})</span
              >
              <span style="padding-left: 10px; cursor: pointer">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="newCom"
      v-if="commentdatas.comments && commentdatas.comments.length > 0"
    >
      <span style="color: #9b0909; font-size: 12px; font-weight: bold"
        >最新评论</span
      >
      <el-divider direction="horizontal"></el-divider>

      <div
        class="comItem"
        v-for="(item, index) in commentdatas.comments"
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
                ><span>{{ item1.content }}</span>
              </div>
            </div>
          </div>

          <div class="like">
            <div class="time">{{ formData(item.time) }}</div>
            <div class="likenum">
              <svg-icon
                @click="like(item)"
                :icon-class="item.liked ? '点赞' : '点赞 (1)'"
                style="color: #409eff"
              />
              <span
                style="border-right: 2px solid #99b5d7; padding-right: 10px"
              >
                ({{ item.likedCount }})</span
              >
              <span
                style="padding-left: 10px; cursor: pointer"
                @click="isShowReply(item)"
                >回复</span
              >
            </div>
          </div>
          <div class="reply1" v-show="item.reply">
            <div class="inp">
              <el-input
                type="textarea"
                :placeholder="replyTextareaPlace"
                v-model="replyTextarea"
                maxlength="140"
                show-word-limit
              ></el-input>
            </div>
            <div class="btn">
              <el-button type="primary" size="mini" @click="reply(item)"
                >回复</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Comment,
  dataType,
  CommentLike,
  CommentUnLike,
  ReplyComment,
} from "@/api/index";
export default {
  props: ["commentData", "type"],
  computed: {
    typeId() {
      return this.$route.query.id
        ? this.$route.query.id
        : this.$route.query.mvid;
    },
    comment() {
      return JSON.parse(this.commentData);
    },
  },

  data() {
    return {
      textarea: "",
      replyTextarea: "",
      replyTextareaPlace: "",
      commentdatas: {},
      CommentLikePayload: { id: "", cid: "", t: 1, type: 0 },
    };
  },
  watch: {
    comment: {
      handler(val) {
        this.commentdatas = val;
      },
      deep: true,
    },
  },
  methods: {
    formData(val) {
      return dataType(val);
    },
    async like(val) {
      console.log(val);
      this.CommentLikePayload.id = this.typeId;
      if (val.liked) {
        val.liked = false;
        val.likedCount--;
        this.CommentLikePayload.cid = val.commentId;
        this.CommentLikePayload.t = 0;
        this.CommentLikePayload.type = this.type;
        var res = await CommentUnLike(this.CommentLikePayload);
      } else {
        val.liked = true;
        val.likedCount++;
        this.CommentLikePayload.cid = val.commentId;
        this.CommentLikePayload.t = 1;
        this.CommentLikePayload.type = this.type;
        var res = await CommentLike(this.CommentLikePayload);
      }
    },
    isShowReply(val) {
      console.log(val);
      this.replyTextareaPlace = `回复${val.user.nickname}：`;
      this.$set(val, "reply", true);
    },
    async PutComment() {
      //回复t=2,评论t=1,删除t=0
      this.CommentLikePayload.id = this.typeId;
      this.CommentLikePayload.t = 1;
      this.CommentLikePayload["content"] = this.textarea;
      this.CommentLikePayload.type = this.type;
      var res = await ReplyComment(this.CommentLikePayload);
      console.log(res);
    },
    async reply(val) {
      //回复t=2,评论t=1,删除t=0
      this.CommentLikePayload.id = this.typeId;
      this.CommentLikePayload.t = 2;
      this.CommentLikePayload.commentId = val.commentId;
      this.CommentLikePayload["content"] = this.replyTextarea;
      this.CommentLikePayload.type = this.type;
      var res = await ReplyComment(this.CommentLikePayload);
      console.log(res);
      if (res.code != 200) {
        this.$message({
          message: "评论失败",
          type: "warning",
        });
        return;
      }
      this.$message({
        message: "评论成功",
        type: "success",
      });
      this.$set(val, "reply", false);
      val.beReplied[0] = {};
      val.beReplied[0] = {
        content: "",
        user: {},
      };
      this.$set(val.beReplied[0], "content", this.replyTextarea);
      this.$set(val.beReplied[0].user, "nickname", "自己");
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
        .reply1 {
          position: relative;
          background-color: #f5f5f5;
          padding: 10px 20px;
          margin: 10px;
          .inp {
            font-size: 12px;
            line-height: 20px;
          }
          .btn {
            text-align: right;
            padding: 10px 0 0 0;
          }
        }
        .reply1:before {
          content: "";
          width: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #f4f5f7;
          position: absolute;
          top: -18px;
          border-radius: 3px;
          right: 2px;
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