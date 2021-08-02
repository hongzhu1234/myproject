<template>
  <div class="homebox">
      <!-- 头部 -->
      <div class="top">
      <div class="box">
        <div class="login1"><img :src="logo" class="img1"/></div>  <div class="span">智慧低代码开发平台 </div>      
     </div>
      </div>
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
       // line-height: 50px;
        background: black;
        color: white;
        padding-left: 5px;
        font-size: 17px;
    
    .box{
           width: 30px;
        height: 20px;
    }
    .login1{
       width: 30px;
        height: 20px;
        border:solid 1px white;
    }
    .img1{
        width: 30px;
        height: 30px;
        line-height: 50px;  
        margin-top: 10px;     
    }
    .span{
        width: 30px;
        height: 30px;
        border:solid 1px white;
      
    }
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