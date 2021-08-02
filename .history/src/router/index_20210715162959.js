import Vue from 'vue'
import VueRouter from 'vue-router'
import interfaces from '../views/Goods/goodsClass/list.vue'

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes
})

export default router





