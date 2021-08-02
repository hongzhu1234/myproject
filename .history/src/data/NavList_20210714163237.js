export default [
  {
    name:'接口文档',
    path:'/gooods',
    id:2, 
  },
  {
    name:'代码生成',
    id:3,
    path:'/code',
  },
   {
    name:'基础配置',
    id:4,
    children:[{
        name:'数据权限',
        path:'/home/orderManagement',
        id:41
    },{
        name:'模块管理',
        path:'/home/orderOverview',
        id:42
    },{
        name:'定时任务',
        path:'/home/evaluateManagement',
        id:43
    },{
        name:'用户管理',
        path:'/home/orderDistribution',
        id:44
    },
    {
        name:'部门管理',
        path:'/home/orderDistribution',
        id:45
    },
    {
        name:'表单设计',
        path:'/home/orderDistribution',
        id:46
    },
    {
        name:'流程设计',
        path:'/home/orderDistribution',
        id:47
    },
    {
        name:'字典分类',
        path:'/home/orderDistribution',
        id:48
    },
    {
        name:'资源管理',
        path:'/home/orderDistribution',
        id:49
    },
]
},{
    name:'流程中心',
    id:5,
    children:[{
        name:'待处理流程',
        path:'/home/regimentalManagement',
        id:51
    },{
        name:'我的流程',
        path:'/home/regimentalAudit',
        id:52
    },{
        name:'已处理流程',
        path:'/home/regimentalEstate',
        id:53
    }]
},{
    name:'仓储中心',
    id:6,
    children:[{
        name:'入库订单',
        path:'/home/configuration',
        id:61
    }]
},{
    name:'附件管理',
    id:7,
    path:'/home/configuration',   
},{
    name:'消息日志',
    id:8,
    children:[{
        name:'系统日志',
        path:'/home/superVip',
        id:81
    },{
        name:'我的消息',
        path:'/home/agent',
        id:82
    }]
}]