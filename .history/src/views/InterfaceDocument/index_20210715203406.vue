<template>
  <div>
      <Bao :baolist='$route.meta.navlin' />
      <el-card class="box-card">
         接口文档
      </el-card>

 <router-view />
  </div>
</template>
