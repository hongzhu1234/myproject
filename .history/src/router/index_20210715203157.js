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
          },

        ]
    },
  {//基础设施
    path: '/basics',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
           path: 'dataAuthority',
           name: '数据权限',
           component: () => import('@/views/BasicsConfiguration/dataAuthority/index.vue'),                     
        },
        {
          path: 'modulePermission',
          name: '模块管理',
          component: () => import('@/views/BasicsConfiguration/modulePermission/index.vue'),   
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

