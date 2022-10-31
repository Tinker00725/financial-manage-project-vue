import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import loan from './loan'
import first from './first'
import end from './end'
import contract from './contract'
import permission from '@/store/permission' 
import routeGuard from '@/store/routeGuard'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    loan,
    first,
    end,
    contract,
    permission,
    routeGuard
  }
})
