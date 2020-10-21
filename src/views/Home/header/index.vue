<!--
 * @Descripttion: 页面上面的部分
 * @Author: Mr.You
 * @Date: 2020-10-12 19:34:01
 * @LastEditTime: 2020-10-21 11:25:41
-->
<template>
  <div class="content">
    <el-row type="flex" align="center">
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <svg-icon
              icon-class="网易云"
              style="font-size: 3.5em; padding: 0px 0; line-height: 40px"
          /></el-col>
          <el-col :span="16">
            <div class="title">Mr.You</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="padding: 10px 0; line-height: 40px">
        <el-search @emitSearch="emitSearch($event)" :width="250"/>
      </el-col>
      <el-col :span="16">
        <div
          v-if="!auth"
          style="
            float: right;
            padding: 10px 0;
            line-height: 40px;
            color: #f3f3f3;
          "
        >
          <span>登录</span>
        </div>

        <div
          v-if="auth"
          style="float: right; padding: 10px 0; line-height: 40px"
        >
          <svg-icon
            icon-class="网易云"
            style="font-size: 3.5em; padding: 10px 0; line-height: 40px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>





<script>
import { SearchSug, DefSearch, HotSearch } from "@/api/index";
import elSearch from '@/components/Search'
export default {
  components: {
    elSearch
  },
  data() {
    return {
      search: "",
      auth: false,
      DefPlaceHoder: "音乐/视频/电台/用户",
      hotSearch: [],
      allSearch: {},
    };
  },
  computed: {
    searchtext() {
      return `<span style='color:#3E8CD7'>${this.search}</span>`;
    },
  },
  mounted() {
    this.getDefSearch();
    this.getHotSearch();
  },
  methods: {
    //默认搜索词
    async getDefSearch() {
      var res = await DefSearch();
      this.DefPlaceHoder = res.data.realkeyword;
    },

    async getHotSearch() {
      var res = await HotSearch();
      res = res.result.hots;
      res.map((val, index) => {
        val["value"] = val.first;
        val["index"] = index;
      });
      this.hotSearch = res;
    },
    async querySearch(val) {
      console.log(1);
      // 调用 callback 返回建议列表的数据

      if (val.trim() == "") {
        return;
      }
      var result = await this.getSearchSug(val);
      console.log(result);
      this.allSearch = result;
    },

    async getSearchSug(val) {
      var res = await SearchSug(val);
      return res.result;
    },

    handleSelect(val) {
      console.log(val);
    },   emitSearch(val) {
      console.log(111,val);
    },
  },
};
</script>
<style lang="scss" scoped>
li:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
.defsearch {
  // background-color: #f5f5f5;
  // display: flex;
  // flex-wrap: wrap;

  .seatitle {
    font-size: 18px;
    color: black;
    padding-bottom: 120px;
  }
  ul {
    padding: 10px 10px 0 10px;
    margin: 0;

    li { font-size: 12px;
      list-style: none;

      .li {
        padding: 10px 0;
        .index1 {
          background-color: #f5f5f5;
          border-radius: 20px;
          display: inline-block;
        
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
        .index2 {
          background-color: #314659;
          border-radius: 20px;
          display: inline-block;
          
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}

.title {
  display: flex;
  margin: auto 0;
  height: 60px;
  font-size: 25px;
  color: #fff;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.spanhot {
  background-color: #666;
  color: #fff;
  padding: 2px 5px;
  border-radius: 50%;
  font-size: 10px;
}
.span {
  padding: 2px 5px;
  border-radius: 50%;
  font-size: 10px;
}

.searchall {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  li {
    overflow: hidden;
    list-style: none;
    width: 180px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
  }

  .singer {
    display: flex;
    flex-direction: row;
    align-items: center;

    .seatitle {
      color: #666;
      flex: 1;
      // border-top: 2px solid #f5f5f5;

      padding: 15px 0px;
    }
    .item {
      // border-top: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
      border-left: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
  .album {
    display: flex;
    flex-direction: row;
    align-items: center;
    .seatitle {
      color: #666;
      flex: 1;
    }
    .item {
      border-left: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
  .songs {
    display: flex;
    flex-direction: row;
    align-items: center;
    .seatitle {
      color: #666;
      flex: 1;
    }
    .item {
      border-left: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
}
</style>