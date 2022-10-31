import {getManageDate,updataLoanUser,deleteUserInfo,submitUser} from '@/api'

const actions = {
    // 获取申请贷款的用户信息
    async getManegeUser(context,data){
        let res = await getManageDate(data);
        if(res.data.code !== 20000){
            return  Promise.reject('failed')
        }
        context.commit('INITINFO',res.data.data.rows)
        context.commit('UPDATETABLEDATA',res.data.data.data.data)
    },
    // 更新loan用户信息
    async updateLoanUserInfo(context,user){
       let res = await updataLoanUser(user);
       if(res.data.code !== 20000) return Promise.reject('failed');
       return 'ok'
    },
    // 删除loan用户信息
    async deleteUser(context,id){
        let res = await deleteUserInfo(id);
        if(res.data.code !== 20000) return Promise.reject('failed');
        return 'ok'
    },
    // 提交用户审核
    async submitUserToApprove(context,id){
        let res = await submitUser(id);
        if(res.data.code !== 20000) return Promise.reject('failed');
        console.log(res)
        // return 'ok'
    }
}
const mutations = {
    INITINFO(state,value){
        state.info.rows = value
    },
    UPDATETABLEDATA(state,value){
        state.tableData = value;
    },
    // 页数的更新数据的更新
    UPDATAPAGENO(state,value){
        state.info.pageNo = value
    },
    // 页容量的更新
    UPDATAPAGESIZE(state,value){
        state.info.pageSize = value
    },
    //更新info的name属性
    UPDATAINFONAME(state,value){
        state.info.name = value;
    },
}
const state = {
    //分页器的数据更新
    info:{
        pageNo:1,
        pageSize:10,
        rows:'',
        name:''
      },
    tableData:[],
}
const getters = {};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}