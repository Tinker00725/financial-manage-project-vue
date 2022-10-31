import {login,logout,submitUserInfo,checkToken} from '@/api'
import {setToken,removeToken} from "@/utils/Token"
const actions = {
    // 登录
    async getToken(context,data){
        let result = await login(data);
        if(result.data.code !== 20000){
            return false
        }
        // 成功：将token传入sessionStorage
        setToken(result.data.data.token)
        return true
    },
    // 登出
    async logoutUser(context){
        let res = await logout();
        let {code} = res.data;
        if(code == 603){
            removeToken()//清除缓存的token
            return 'ok'
        }
        // return Promise.reject('failed')
    },
    // 提交信息
    async createLoaningUser(context,info){
        let result = await submitUserInfo(info);
        console.log(result)
        if(result.data.code !== 20000){
            return Promise.reject('failed')
        }
        return '创建成功'
    },
    // 鉴别是否登录
    async checKUserLogin({commit}){
        let res = await checkToken();
        if(res.data.code !== 20000) return Promise.reject('failed');
        commit('ADDNAME',res.data.data.roles)
        return res.data.data.roles;
    }
}
const mutations = {
    ADDNAME(state,value){
        let {name} = value[0]
        state.roles = name;
    }
}

const state = {
    roles:''
}

const getters = {
    roles:(state) => state.roles
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}