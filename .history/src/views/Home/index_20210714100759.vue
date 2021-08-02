<template>
  <div class="homebox">
      <!-- 头部 -->
      <div class="top">
      <div>
      <img :src="logo"/>
      </div>
      智慧低代码开发平台</div>
      <div class="bottom">
          <!-- 左侧导航栏 -->
          <div class="left">
              <NavList :navList="navList" />
          </div>
          <div class="right">
              <!-- 二级导航 -->
              <router-view/>
          </div>
      </div>
  </div>
</template>

<script>
import NavList from '../../components/NavList.vue'
import navList from '../../data/NavList'
import logo from '@/assets/logo.png'
export default {

    data() {
        return {
            navList,      	
            logo: logo
        }
    },

    components:{
        NavList
    }
}
</script>

<style lang='scss' scoped>

.homebox{
    width: 100%;
    height: 100%;
    .top{
        width: 100%;
        height: 5%;
        line-height: 50px;
        background: black;
        color: white;
        padding-left: 50px;
        font-size: 17px;
    }
    .bottom{
        width: 100%;
        height: 92%;
        display: flex;
        justify-content: center;
        .left{
            width: 15%;
            background: darkcyan;
            overflow: hidden;
            .el-menu{
                width: 100%;
                height: 100%;
                .el-menu-item{
                    min-width: 100px !important;
                    width: 100% !important;
                }
            }
        }
        .right{
            width: 85%;
        }
    }
}
</style>