import {constentRoutes,asyncRouter} from '@/router'
function filterAsyncRouter(name,asyncRouter){//定义筛选路由的方法
    let res = [];
    asyncRouter.forEach(element => {
        let bool = element.meta && element.meta.roles && element.meta.roles.includes(name);
        if(bool){
            res.push(element)
        }
    });
    return res
}

const actions = {
    async generateRouter({commit},name){//通过角色判断路由展示
        let home = constentRoutes.filter(item =>{
            return item.name === 'layout'
        })[0];//获取布局页面
        home.children = []//清空子集
        let accessRouter;
        if(name === 'administrator'){//管理员获得所有路由
            accessRouter = asyncRouter;
        }else{//其他权限需要筛选路由
            let filterRouter = filterAsyncRouter(name,asyncRouter);
            accessRouter = filterRouter;
        }
        commit('SET_ROUTES',accessRouter);
        return accessRouter;

    },};
const mutations = {
    SET_ROUTES(state,value){
        state.routes = value
    }
};
const state = {
    routes:[]
};
const getters = {};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}