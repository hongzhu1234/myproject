<template>
  <div>
      <Bao :baolist='$route.meta.navlin' />
      <el-card class="box-card">
          工作台
      </el-card>

 <router-view />
  </div>
</template>
