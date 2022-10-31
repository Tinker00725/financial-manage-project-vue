import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router"; 

Vue.use(VueRouter);
/*
 解决router内部报错
*/
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

// 基础路由
export const constentRoutes = [
  {
    path:'/',
    redirect:'/layout/home',
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/layout", //相当于布局页，主体部分的切换
    name: "layout",
    component: () => import("@/layout"),
    children: [],
  },
];
// 异步路由
export const asyncRouter = [
  {
    path: "/layout/home", //相当于布局页里面的首页
    name: "home",
    meta:{item:'首页',roles:['input','approve']},
    component: () => import("@/views/home"),
  },
  {
    path: "/layout/loan-application",//贷款申请
    name:'loan-application',
    meta:{item:'贷款申请',roles:['input']},
    component:() => import('@/views/loan-application')
  },
  {
    path: "/layout/loan-manage",//申请管理
    name:'loan-manage',
    meta:{item:'申请管理',roles:['input']},
    component:() => import('@/views/loan-manage')
  },
  {
    path:'/layout/loan-approve',
    name:'loan-approve',
    redirect:'loan-approve/first',
    component:()=>import('@/views/loan-approve'),//虽然不展示，写上子路由就可以展示
    meta:{item:'贷款审批',roles:['approve']},
    children:[
      {
        path:'first',
        name:"loan-approve/first",
    component:() => import('@/views/loan-approve/loan-approve-first'),
    meta:{item:'初审'}
      },
      {
        path:'end',
        name:"loan-approve/end",
    component:() => import('@/views/loan-approve/loan-approve-end'),
    meta:{item:'终审'}
      }
    ]
  },
  {
    path: "/layout/loan-target",//标的管理
    name:'loan-target',
    meta:{item:'标的管理',roles:['approve']},
    component:() => import('@/views/loan-target'),
  },
  {
    path:'/layout/loan-permission',
    name:'loan-permission',
    component:() => import('@/views/loan-permission'),
    meta:{item:'权限管理'},
    children:[
      {
        path:'createAdministor',
        name:'loan-permission/createAdministor',
        component:() => import('@/views/loan-permission/createAdministor'),
        meta:{item:'创建管理员'}
      },
      {
        path:'listShow',
        name:'loan-permission/listShow',
        component:() => import('@/views/loan-permission/listShow'),
        meta:{item:'列表展示'}
      }
    ]
  },

]

const router = new VueRouter({
  routes:constentRoutes,//固定写法routes
});

// 全局路由守卫
router.beforeEach(async(to,from,next) => {
  if(to.path == '/login'){
    next();
  }else{//去的不是登录页，验证身份
    if(store.state.user.roles){//已经登录
      next()
    }else{//未登录，第一次登录
      try{
        let res = await store.dispatch('user/checKUserLogin');
        let {name} = res[0];//获取到登录身份,通过身份验证筛选路由
        let routerRes = await store.dispatch('routeGuard/generateRouter',name);
        console.log(routerRes)
        
        routerRes.forEach(item => {
          router.addRoute('layout',item)//添加到layout的children中
        })

        if(name){
          next({path:to.path})
        }
      }catch(e){
        next('/login')
      }
      }
  }
})

export default router;
