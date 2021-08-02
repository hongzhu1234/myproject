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
      <!-- 左侧导航栏 -->
      <div class="left">
            <!-- 实现菜单多级分类 -->
            <el-menu
            @open="handleOpen"
            @close="handleClose"
            default-active="1-1-1-1"
            background-color="rgba(37, 37, 75, 0.965)"
            text-color="white"
            active-text-color="#000"
             height="100%"
            >
            <!-- 引入组件 -->
            <menu-tree :navList="navList"></menu-tree>
            </el-menu>
      </div>
      <div class="right">
        <!-- 二级导航 -->
        <router-view />
      </div>
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
    }
    .right {
      width: 85%;
    }
  }
}
.el-menu{
     background-color:rgba(37, 37, 75, 0.965) 
}
</style>