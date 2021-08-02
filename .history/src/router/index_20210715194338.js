import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/Workbench',
    name: 'indexs',
    component: () => import('@/views/'),
  }, 
  {// 商品管理
    path: '/goods',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
           path: 'goodsClass',
           name: '分类',
           component: () => import('@/views/Goods/goodsClass/index.vue'),                     
        },
        {
          path: 'goodsManagement',
          name: '管理',
          component: () => import('@/views/Goods/goodsManagement/index.vue')
        },
        {
          path: 'list',
          name: '列表',
          component: () => import('@/views/Goods/goodsClass/list.vue')   
        },
      ]
  },
]

const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes
})
export default router

