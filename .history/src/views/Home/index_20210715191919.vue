<template>
  <div class="homebox">
    <!-- 头部 -->
    <div class="top">
      <div class="box">
        <div class="login1"><img :src="logo" class="img1" /></div>
        <div class="span">
          智慧低代码开发平台&ensp;<i class="el-icon-link"></i>
        </div>
      </div>
    </div>
    <div class="bottom">
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="180px" style="background-color: #304156">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          :router="true"
          active-text-color="#1670ff"
          @select="handleSelect"
        >
          <div v-for="item in MenuTree" :key="item.id">
            <el-submenu v-if="item.children" :index="item.index">
              <template slot="title"
                ><i :class="item.icon"></i>{{ item.name }}</template
              >
              <el-menu-item
                v-for="v in item.children"
                :key="v.id"
                :index="v.index"
                >{{ v.name }}
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="item.index"
              ><template slot="title"
                ><i :class="item.icon"></i>{{ item.name }}</template
              ></el-menu-item
            >
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <div class="main-view">
          <div class="main-tag-list">

          <el-tag
            :key="tag.id"
            v-for="tag in tabList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            @click="handleGo(tag)"
          >
            {{ tag.title }}
          </el-tag>
          </div>

          <div class="main-view-contain">
            <router-view />
          </div>
        </div>

        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-news"></use>
        </svg> -->
      </el-container>
    </el-container>
    </div>
  </div>
</template>
<script>
import MenuTree from "../../components/NavList.vue";
import navList from "../../data/NavList";
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      navList,
      logo: logo,
    };
  },

  components: {
    MenuTree,
  },
};
</script>

<style lang='scss' scoped>
.homebox {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 5%;
    background: black;
    color: white;
    padding-left: 5px;
    font-size: 17px;
    .box {
      width: 300px;
      height: 50px;
      border: solid 1px rgb(38, 27, 27);

      .login1 {
        width: 30px;
        height: 20px;
      }
      .img1 {
        width: 30px;
        height: 30px;
        line-height: 50px;
        margin-top: 10px;
        float: left;
      }
      .span {
        float: right;
        line-height: 5px;
        width: 265px;
        height: 30px;
        border: solid 2px rgb(9, 8, 9);
        padding-bottom: -5px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 92%;
    display: flex;
    justify-content: center;
    .left {
      width: 15%;
      height: 100%;
       background-color: rgb(47, 45, 48);
    }
    .right {
      width: 85%;
    }
  }
}

</style>