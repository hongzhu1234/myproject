<template>
  <div>
      <Bao :baolist='$route.meta.navlin' />
      <el-card class="box-card">
         数据权限
      </el-card>

 <router-view />
  </div>
</template>
