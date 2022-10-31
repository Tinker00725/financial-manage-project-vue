import { endSearch ,endPass,endReject} from "@/api";

const actions = {
  async getFirstUser(context, data) {
    let res = await endSearch(data);
    if (res.data.code !== 20000) return Promise.reject("failed");
    context.commit("ADDUSER", res.data.data.data.data);
    context.commit('ADDROWS',res.data.data.rows)
  },
  // 终审通过
  async passUserLoanEnd(context,id){
    let res = await endPass({appId: id, loanId: id});
    if(res.data.code !== 20000) return Promise.reject('failed');
    return 'ok'
  },
  // 终审拒绝
  async rejectLoanUser(context,id){
    let res = await endReject({appId:id,loanId:id});
    if(res.data.code !== 20000) return Promise.reject('failed');
    return 'ok'
  } 
};
const mutations = {
    ADDROWS(state,value){
        state.info.rows = value;
    },
  ADDUSER(state, value) {
    state.tableData = value;
  },
  UPDATAINFONAME(state, value) {
    state.info.name = value;
  },

  // 页数的更新数据的更新
  UPDATAPAGENO(state, value) {
    state.info.pageNo = value;
  },
  // 页容量的更新
  UPDATAPAGESIZE(state, value) {
    state.info.pageSize = value;
  },
};
const state = {
  info: {
    pageNo: 1,
    pageSize: 10,
    name: "",
    rows: "",
  },
  tableData: [],
};
const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
