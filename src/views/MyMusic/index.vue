<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2021-05-05 19:17:33
-->
<template>
  <div class="home">
    <el-container>
      <el-main :class="auth ? 'none' : 'main'"
        ><div class="animate box" v-if="!auth">
          <div class="title"><span>私人的音乐空间，听我想听的歌</span></div>
          <div class="title1"><span>登录管理我的音乐，多终端同步</span></div>
          <div class="btn">
            <span>
              <el-button
                type="success"
                size="default"
                @click="dialogVisible = !dialogVisible"
                >立即登录</el-button
              >
            </span>
          </div>
        </div>
        <div v-if="auth" class="au">
          <transition name="slide-left" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition></div
      ></el-main>
      <!-- </el-container>
      <el-footer style="height: 50rem"><elfooter /></el-footer> -->
    </el-container>
    <el-dialog
      :modal="false"
      title="登录网易云音乐"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <login @logout="dialogVisible = !dialogVisible"></login>
    </el-dialog>
  </div>
</template>

<script>
import login from "@/views/Home/header/login/index";
import elheader from "@/views/Home/header";
import elfooter from "@/views/Home/footer";
import elaside from "@/views/Home/aside";
import { getToken, removeCookie } from "@/utils/cookie";

export default {
  name: "Home",
  components: { elheader, elaside, elfooter, login },
  data() {
    return { dialogVisible: false };
  },
  computed: {
    auth() {
      var isLogin = this.$store.state.isLogin;
      if (isLogin) {
        return isLogin;
      } else if (getToken("auth")) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleClose(done) {
      done();
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .slide-left-enter {
    opacity: 0;
    -webkit-transform: translate(50rem, 0);
    transform: translate(50rem, 0);
  }
  .slide-left-enter-active {
    transition: all 0.5s ease;
  }
  .slide-left-leave-to {
    opacity: 0;
    -webkit-transform: translate(-50rem, 0);
    transform: translate(-50rem, 0);
  }
  .slide-left-leave-active {
    transition: all 0.5s ease;
  }
  .main {
    height: calc(100vh - 110px);
    background-image: url("../../icons/pic/lan.jpg");
    background-size: cover;
  }
  .animate {
    font-size: 50rem;
    margin: 100rem 0 0;
    color: #fff;
    .title {
    }
    .title1 {
      padding-top: 30rem;
      font-size: 30rem;
    }
    .btn {
      padding-top: 20rem;
      .el-button {
        transform: scale(1.3);
      }
    }
  }

  .animate span {
    display: inline-block;
  }

  .box span {
    color: #fff;
    opacity: 0;
    transform: translate(0, 100rem) scale(0.5);
    animation: leftRight 2s forwards;
  }

  @keyframes leftRight {
    40% {
      transform: translate(0rem, 10rem) scale(0.7);
      opacity: 1;
    }

    100% {
      transform: translate(0) scale(1);
      opacity: 1;
    }
  }
}
</style>