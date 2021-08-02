<template>
  <div>
      <Bao :baolist='$route.meta.navlin' />
      <el-card class="box-card">
         代码生成
      </el-card>

 <router-view />
  </div>
</template>
