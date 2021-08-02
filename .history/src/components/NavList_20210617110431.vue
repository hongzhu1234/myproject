<template>
  <el-menu
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    style="height: 100%"
    @open="handleOpen"
    unique-opened
    router
    @close="handleClose"
  >
    <el-menu-item style="width: 100%" index="/workbench" :key="index">
      <template #title>
        <i class="el-icon-location"></i>
        <span>工作台</span>
      </template>
    </el-menu-item>
    <!-- 一级 -->
    <el-submenu :index="i" v-for="(v, i) in navList" :key="i">
      <template #title>
        <i class="el-icon-location"></i>
        <span>{{ v.name }}</span>
      </template>
      <el-menu-item-group>
        <div v-for="(item, index) in v.children" :key="index">
          <!-- 二级 -->
          <el-submenu :index="item.id" v-if="item.children">
            <template #title>{{ item.name }}</template>
            <el-menu-item
              :index="items.path"
              style="width: 100%"
              v-for="(items, indexs) in item.children"
              :key="indexs"
            >
              {{ items.name }}
            </el-menu-item>
          </el-submenu>
          <!-- 三级 -->
          <el-menu-item v-else :index="item.path" style="width: 100%">
            {{ item.name }}
          </el-menu-item>
        </div>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  // created() {
  //     console.log(this.navlsit)
  //     debugger
  // },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

  props: ["navList"],
};
</script>

<style>
</style>