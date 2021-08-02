import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'indexs',
    component: () => import('@/views/Home/index.vue'),
    meta: { sortNo: 0 },
    children: [{
      path: '/',
      name: 'indexs',
     // meta: { title: '主页', icon: 'iconfont icon-zhuyeicon', sortNo: 0 },
      component: () => import('@/views/Home/index.vue'),
    },{
      path: '/goods',
      name: 'goods',
      hidden: true,
      meta: { title: '个人中心', icon: 'guide', sortNo: 0 },
      component: () => import('@/views/Goods/goodsClass/index.vue')
    }]
  }


  //案例
  // {
  //   path: '/goods',
  //   name: 'indexs',
  //   component: () => import('@/views/Home/index.vue'),
  //   children: [
  //       {
  //         path: 'goodsClass',
  //         name: '商品分类',
  //         component: () => import('@/views/Goods/goodsClass/index.vue')
  //       },
  //       {
  //         path: 'goodsManagement',
  //         name: '商品分类',
  //         component: () => import('@/views/Goods/goodsManagement/index.vue')
  //       }
  //     ]
  // }
]

const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes
})

export default router
