import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//import Cookies  from 'js-cookie'
//import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
  },
  {// 商品管理
    path: '/goods',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
           path: 'goodsClass',
           name: 'goodsClass',
           component: () => import('@/views/Goods/goodsClass/index.vue'),                     
        },
        {
          path: 'goodsManagement',
          name: '',
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

