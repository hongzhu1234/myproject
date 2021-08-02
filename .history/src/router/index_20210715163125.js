import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//import Cookies  from 'js-cookie'
//import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/home',
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
           name: '商品分类',
           component: () => import('@/views/Goods/goodsClass/index.vue'),                     
        },
        {
          path: 'goodsManagement',
          name: '商品管理',
          component: () => import('@/views/Goods/goodsManagement/index.vue')
        },
        {
          path: 'goodsSize',
          name: '商品规格',
          component: () => import('@/views/Goods/goodsSize/index.vue')
        },
        {
          path: 'list',
          name: '列表',
          component: () => import('@/views/Goods/goodsClass/list.vue')   
        },
      ]
  },
    {// 订单
      path: '/Order',
      name: '订单',
      component: () => import('@/views/Home/index.vue'),
      children: [
          {
            path: 'orderManagement',
            name: '订单管理',
            component: () => import('@/views/Order/orderManagement/index.vue')
          },
          {
            path: 'orderOverview',
            name: '订单概述',
            component: () => import('@/views/Order/orderOverview/index.vue')
          },
          {
            path: 'evaluateManagement',
            name: '订单概述',
            component: () => import('@/views/Order/evaluateManagement/index.vue')
          },
          {
            path: 'orderDistribution',
            name: '订单概述',
            component: () => import('@/views/Order/orderDistribution/index.vue')
          },
        ]
    },
  {// 仓库管理
    path: '/WareHouse',
    name: '仓库',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
          path: 'storeManagement',
          name: '仓库管理',
          component: () => import('@/views/WareHouse/storeManagement/index.vue')
        },
        {
          path: 'distributionArea',
          name: '配送小区',
          component: () => import('@/views/WareHouse/distributionArea/index.vue')
        },
        {
          path: 'enterManagement',
          name: '入库管理',
          component: () => import('@/views/WareHouse/enterManagement/index.vue')
        },
        {
          path: 'storeInquire',
          name: '入库查询',
          component: () => import('@/views/WareHouse/storeInquire/index.vue')
        }, 
        {
          path: 'outStoreManagement',
          name: '出库管理',
          component: () => import('@/views/WareHouse/outStoreManagement/index.vue')
        },
        {
          path: 'outStoreInquire',
          name: '出库查询',
          component: () => import('@/views/WareHouse/outStoreInquire/index.vue')
        },    
        {
          path: 'setPointManagement',
          name: '盘点管理',
          component: () => import('@/views/WareHouse/setPointManagement/index.vue')
        },    
        {
          path: 'Details',
          name: '盘点详细',
          component: () => import('@/views/WareHouse/setPointManagement/Details.vue')   
        },
        {
          path: 'inventoryOnHand',
          name: '现有库存',
          component: () => import('@/views/WareHouse/inventoryOnHand/index.vue')
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

