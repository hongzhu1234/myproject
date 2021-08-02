export default [
   {
        name:'主页面',
        id:2,
        path:'/zhu',
        icon:"el-icon-circle-check",    
   },
  {
    name:'接口文档',
    id:3,
    path:'/interface',
    icon:"el-icon-guide"
    src:""
  },
  {
    name:'代码生成',
    id:3,
    path:'/code',
    icon:"el-icon-circle-check"
  },
   {
    name:'基础配置',
    id:4,
    icon:"el-icon-setting",
    children:[{
        name:'数据权限',
        path:'/goods/goodsClass',
        id:41,
        icon:"el-icon-key",
    },{
        name:'模块管理',
        path:'/goods/goodsManagement',
        id:42,
        icon:"el-icon-receiving"
    },{
        name:'定时任务',
        path:'/home/evaluateManagement',
        id:43,
        icon:"el-icon-alarm-clock"
    },{
        name:'用户管理',
        path:'/home/orderDistribution',
        id:44,
        icon:"el-icon-tickets"
    },
    {
        name:'部门管理',
        path:'/home/orderDistribution',
        id:45,
        icon:"el-icon-document-remove"
    },
    {
        name:'表单设计',
        path:'/home/orderDistribution',
        id:46,
        icon:"el-icon-document"
    },
    {
        name:'流程设计',
        path:'/home/orderDistribution',
        id:47,
        icon:"el-icon-bottom"
    },
    {
        name:'字典分类',
        path:'/home/orderDistribution',
        id:48,
        icon:"el-icon-notebook-1"
    },
    {
        name:'资源管理',
        path:'/home/orderDistribution',
        id:49,
        icon:"el-icon-guide"
    },
]
},{
    name:'流程中心',
    id:5,
    icon:"el-icon-guide",
    children:[{
        name:'待处理流程',
        path:'/home/regimentalManagement',
        id:51,
        icon:"el-icon-guide"
    },{
        name:'我的流程',
        path:'/home/regimentalAudit',
        id:52,
        icon:"el-icon-bottom"
    },{
        name:'已处理流程',
        path:'/home/regimentalEstate',
        id:53,
        icon:"el-icon-right"
    }]
},{
    name:'仓储中心',
    id:6,
    icon:'el-icon-discount',
    children:[{
        name:'入库订单',
        path:'/home/configuration',
        id:61,
        icon:"el-icon-discount"
    }]
},{
    name:'附件管理',
    id:7,
    icon:"el-icon-reading",
    path:'/home/configuration',   
},{
    name:'消息日志',
    id:8,
    icon:"el-icon-search",
    children:[{
        name:'系统日志',
        path:'/home/superVip',
        id:81,
        icon:"el-icon-set-up"
    },{
        name:'我的消息',
        path:'/home/agent',
        id:82,
        icon:"el-icon-folder-checked"
    }]
}]