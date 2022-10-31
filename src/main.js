import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'//引入ui样式

Vue.config.productionTip = false
Vue.use(ElementUI)//使用插件
Vue.prototype.url = 'http://1.116.64.64:5004';//用于下载文件地址拼接
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
