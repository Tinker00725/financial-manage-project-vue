import { contractSearch,createContract,downloadContract } from "@/api";

const actions = {
  async getcontracUser(context, data) {
    let res = await contractSearch(data);
    if (res.data.code !== 20000) return Promise.reject("failed");
    context.commit("ADDUSER", res.data.data.data.data);
    context.commit('ADDROWS',res.data.data.rows)
  },
  // 生成合同
  async createLoanerContrate(context,row){
    let res = await createContract({id:row.id});
    if(res.data.code !== 20000) return Promise.reject('failed');
    return 'ok';
  },
  // 下载合同
  async downloadLoanerContract(context,id){
    let res = await downloadContract(id);
    if(res.data.code !== 20000) return Promise.reject('failed');
    return res.data.data;
  }
};
const mutations = {
    // 总行数
    ADDROWS(state,value){
        state.info.rows = value;
    },
    // 获取原始数据
  ADDUSER(state, value) {
    state.tableData = value;
  },
//   名字查询
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
