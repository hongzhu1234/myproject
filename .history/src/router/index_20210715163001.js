import Vue from 'vue'
import VueRouter from 'vue-router'
import interfaces from '../views/Goods/goodsClass/list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    childern:[{
      path: '/home',
      component: () => import('@/views/Goods/goodsClass/index.vue')    
    }]
  },
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
    name: '',
    iconCls: 'fa fa-address-card',
    leaf: true,//只有一个节点
    children: [
        { path: '/interface', component: interfaces, name: '接口文档' }
    ]
}, 
  {
    path: '/goods',
    name: 'indexs',
    component: () => import('@/views/Home/index.vue'),
    children: [
        {
          path: 'goodsClass',
          name: '商品分类',
          component: () => import('@/views/Goods/goodsClass/index.vue')
        },
        {
          path: 'goodsManagement',
          name: '商品分类',
          component: () => import('@/views/Goods/goodsManagement/index.vue')
        }

      ]
  }
]

const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes
})

export default router





// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: '首页',
//       component: indexs
//     },
//     {
//       path: '/Home',
//       name: '主页面',
//       redirect: '/Home/index',
//       component: () => import('@/views/Home/index.vue'),
//       children: [
//         {
//           path: 'goodsClass',
//           name: '商品分类',
//           component: () => import('@/views/Home/index.vue')
//         }
//       ]
//     }
//   ]
// })