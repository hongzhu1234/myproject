import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tabList: []
    },
    mutations: {
        // 增加
        add_tabList(state, payload) {
            // 存在切改  查找到 >-1
            const index = state.tabList.findIndex(item => item.index === payload.index)
            //添加
            if (index === -1) {
                // 去重
                state.tabList.push(payload)
            }else{
                // 跳转对应的页面
                router.push(payload.index)
            }
        },
        //删除
        del_tabList(state,payload){
           const index= state.tabList.findIndex(item=>item.index===payload.index)
           if(index>-1){
            //    删除
            state.tabList.splice(index,1)
           }
        }
    },
    getters: {
    }
})


export default store