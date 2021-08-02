import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//---------------------------百度富文本编辑器
import '../public/ueditor/ueditor.config.js'
import '../public/ueditor/ueditor.all.js'
import '../public/ueditor/lang/zh-cn/zh-cn.js'
import '../public/ueditor/formdesign/leipi.formdesign.v4.js'
//---------------------------百度富文本编辑器1


// 请假条表单和详情
import FrmLeaveReqAdd from '@/views/BasicsConfiguration/formdesign/userDefine/frmLeaveReq/add'
import FrmLeaveReqDetail from '@/views/BasicsConfiguration/formdesign/userDefine/frmLeaveReq/detail'

// 请假条表单和详情
import OrderProcessAdd from '@/views/BasicsConfiguration/formdesign/userDefine/OrderProcess/add'
import OrderProcessDetail from '@/views/BasicsConfiguration/formdesign/userDefine/OrderProcess/detail'

// 因公出差的表单和详情
import BaWeiGoOutOnBusinessAdd from '@/views/BasicsConfiguration/formdesign/userDefine/BaWeiGoOutOnBusiness/add'
import BaWeiGoOutOnBusinessDetail from '@/views/BasicsConfiguration/formdesign/userDefine/BaWeiGoOutOnBusiness/detail'

// 八维异常考情情况说明
import BaWeiAbnormalAttendanceInstructionAdd from '@/views/BasicsConfiguration/formdesign/userDefine/BaWeiAbnormalAttendanceInstruction/add'
import BaWeiAbnormalAttendanceInstructionDetail from '@/views/BasicsConfiguration/formdesign/userDefine/BaWeiAbnormalAttendanceInstruction/detail'


Vue.config.productionTip = false
// Vue.prototype.$layer = layer(Vue, {
//   msgtime: 3
// })
Vue.component('FrmLeaveReqAdd', FrmLeaveReqAdd)
Vue.component('FrmLeaveReqDetail', FrmLeaveReqDetail)
Vue.component('OrderProcessAdd', OrderProcessAdd)
Vue.component('OrderProcessDetail', OrderProcessDetail)
Vue.component('BaWeiGoOutOnBusinessAdd', BaWeiGoOutOnBusinessAdd)
Vue.component('BaWeiGoOutOnBusinessDetail', BaWeiGoOutOnBusinessDetail)
Vue.component('BaWeiAbnormalAttendanceInstructionAdd', BaWeiAbnormalAttendanceInstructionAdd)
Vue.component('BaWeiAbnormalAttendanceInstructionDetail', BaWeiAbnormalAttendanceInstructionDetail)





import axios from "@/router/axios";
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
