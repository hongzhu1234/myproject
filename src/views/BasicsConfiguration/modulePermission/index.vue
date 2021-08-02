<template>
  <div>
      <Bao :baolist='$route.meta.navlin' />
      <el-card class="box-card">
        模块管理
      </el-card>

 <router-view />
  </div>
</template>
