import {createAdministor,showList} from '@/api'
const actions = {
    // 提交创建管理员
    async submitCreate(context,data){
        let res = await createAdministor(data);
        if(res.data.code !== 20000) return Promise.reject('failed');
        return 'ok'
    },
    // 列表展示
    async showUserList(context){
        let res = await showList();
        if(res.data.code !== 20000) return Promise.reject('failed');
        context.commit('ADDUSER',res.data.data)
    }
};
const mutations = {
    ADDUSER(state,value){
        state.tableData = value
    }
};
const state = {
    tableData:[],
};
const getters = {};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}