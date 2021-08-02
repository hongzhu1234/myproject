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
    component: () => import('@/views/Workbench/index.vue'),
  }, 
    {// 工作台
      path: '/work',
      name: 'indexs',
      component: () => import('@/views/Home/index.vue'),
      children: [
          {
            path: 'Workbench',
            name: 'indexs',
            component: () => import('@/views/Workbench/index.vue'),                   
          }
        ]
    },
  {
    path: '/basics',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
           path: 'dataAuthority',
           name: '分类',
           component: () => import('@/views/BasicsConfiguration/dataAuthority/index.vue'),                     
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

