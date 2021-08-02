export default [
  {
    name:'接口文档',
    path:'/goods',
    id:2, 
  },
  {
    name:'代码生成',
    id:3,
    path:'/goods',
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
        name:'子淀粉类',
        path:'/home/orderDistribution',
        id:48
    },
]
},{
    name:'团长',
    id:5,
    children:[{
        name:'团长管理',
        path:'/home/regimentalManagement',
        id:51
    },{
        name:'团长审核',
        path:'/home/regimentalAudit',
        id:52
    },{
        name:'团长等级',
        path:'/home/regimentalEstate',
        id:53
    },{
        name:'设置',
        path:'/home/set',
        id:54
    },{
        name:'路线',
        path:'/home/line',
        id:54
    }]
},{
    name:'门店',
    id:6,
    children:[{
        name:'配置',
        path:'/home/configuration',
        id:61
    },{
        name:'门店',
        path:'/home/shop',
        id:62
    },{
        name:'商品',
        path:'/commodity',
        id:63
    },{
        name:'订单',
        path:'/home/order',
        id:64
    },{
        name:'提现',
        path:'/home/withdraw',
        id:65
    },{
        name:'到店付款',
        path:'/home/storePayment',
        id:66
    }]
},{
    name:'仓库',
    id:7,
    children:[{
        name:'仓库管理',
        path:'/home/storeManagement',
        id:71
    },{
        name:'配送小区',
        path:'/home/distributionArea',
        id:72
    },{
        name:'入库管理',
        path:'/home/storeManagement ',
        id:73
    },{
        name:'入库查询',
        path:'/home/storeInquire',
        id:74
    },{
        name:'出库管理',
        path:'/home/outStoreManagement',
        id:75
    },{
        name:'出库查询',
        path:'/home/outStoreInquire',
        id:76
    },{
        name:'盘点管理',
        path:'/home/setPointManagement',
        id:77
    },{
        name:'现有库存',
        path:'/home/inventoryOnHand',
        id:78
    }]
},{
    name:'分销',
    id:8,
    children:[{
        name:'超级会员',
        path:'/home/superVip',
        id:81
    },{
        name:'代理商',
        path:'/home/agent',
        id:82
    },{
        name:'佣金记录',
        path:'/home/commissionRecord',
        id:83
    },{
        name:'设置',
        path:'/home/setting',
        id:84
    },{
        name:'路线',
        path:'/home/line',
        id:84
    }]
},{
    name:'小程序',
    children:[{
        name:'支付',
        path:'/home/pay'
    }]
},{
    name:'权限',
    id:9,
    children:[{
        name:'员工管理',
        path:'/home/staffManagement',
        id:91
    },{
        name:'角色管理',
        path:'/home/roleManagement',
        id:92
    },{
        name:'佣金记录',
        path:'/home/commissionRecord',
        id:93
    },{
        name:'客服管理',
        path:'/home/serviceManagement',
        id:94
    }]
}]