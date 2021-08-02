import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

Vue.use(Router)
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
          {
            path: 'interface',
            name: 'indexs',
            component: () => import('@/views/InterfaceDocument/index.vue'),                   
          },
          {
            path: 'code',
            name: 'indexs',
            component: () => import('@/views/CodeGenerate/index.vue'),                   
          }
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
        {
          path: 'usermanagement',
          name: '用户管理',
          component: () => import('@/views/BasicsConfiguration/usermanagement/index.vue'),   
        },
        {
          path: 'departmentmanagement',
          name: '部门管理',
          component: () => import('@/views/BasicsConfiguration/departmentmanagement/index.vue'),   
        },
        //表单---------------------------------------------------------------------------------
        {
          path: 'formdesign',
          name: '表单设计',
          component: () => import('@/views/BasicsConfiguration/formdesign/index.vue'),   
        },
        {
          path: '/insertInfo',
          name: '表单设计',
          component: () => import('@/views/BasicsConfiguration/formdesign/components/insertInfo.vue'),   
        },
        {
          path: 'formedit',
          name: '表单编辑',
          component: () => import('@/views/BasicsConfiguration/formdesign/edit.vue'),   
        },
        //流程---------------------------------------------------------------------------------
        {
          path: 'flowschemes',
          name: '流程设计',
          component: () => import('@/views/BasicsConfiguration/flowschemes/index.vue'),   
        },
        {
          path: 'add',
          name: '流程设计的添加',
          component: () => import('@/views/BasicsConfiguration/flowschemes/add.vue'),   
        }, 
        {
          path: '/edit',
          name: '流程设计的编辑',
          component: () => import('@/views/BasicsConfiguration/flowschemes/edit.vue'),   
        },        
        {
          path: '/flowSchemeDtl',
          name: '流程设计的详情',
          component: () => import('@/views/BasicsConfiguration/flowschemes/components/flowSchemeDtl.vue'),   
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

