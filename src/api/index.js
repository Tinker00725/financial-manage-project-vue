import requests from '@/api/request';

// 登录
export const login =  (data) => requests({url:'/user/login',method:'post',data})
// 对比用户token
export const checkToken = () => requests({url:'/user/info',method:'get'})
// 登出
export const logout = () => requests({url:'/user/logout',method:'post'})
// 提交信息
export const submitUserInfo = (data) => requests({url:'/loan/create',method:'post',data})
// 申请贷款查询
export const getManageDate = (data) => requests({url:'/loan/list',method:'get',params:data})//query传参
// 更新用户数
export const updataLoanUser = (data) => requests({url:'/loan/update',method:'put',data})
//删除用户
export const deleteUserInfo = (id) => requests({url:`/loan/delete/${id}`,method:'delete'})
// 提交用户审核
export const submitUser = (id) => requests({url:'/loan/submitToApprove',method:'post',data:{id}})//body传参
// 初审查询
export const firstSearch = (data) => requests({url:'/approve/first/list',method:'get',params:data})
// 初审通过
export const firstPass = (data) => requests({url:'/approve/first/pass',method:'post',data})
// 初审拒绝
export const firstReject = (data) => requests({url:'/approve/first/reject',method:'post',data})
// 终审查询
export const endSearch = (data) => requests({url:'/approve/end/list',method:'get',params:data})
// 终审通过
export const endPass = (data) => requests({url:'/approve/end/pass',method:'post',data})
// 终审拒绝
export const endReject = (data) => requests({url:'approve/end/reject',method:'post',data})
// 标的管理——查询
export const contractSearch = (data) => requests({url:'contract/list',method:'get',params:data})
// 生成合同
export const createContract = (data) => requests({url:'contract/createFile',method:'post',data})
// 下载合同
export const downloadContract = (id) => requests({url:'contract/download',method:'get',params:{id}})
// 创建管理员
export const createAdministor = (data) => requests({url:'permission/createUser',method:'post',data})
// 列表展示
export const showList = () => requests({url:'user/list',method:'get'})