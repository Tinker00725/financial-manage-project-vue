import axios from "axios";
import nProgress from "nprogress";
import {getToken} from '@/utils/Token'
import { msgBox } from "@/utils/message";
let requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use(function (config) {
  nProgress.start();
  // 如果sessionStorage有token就传递token
  const token = getToken();
  if(token){
    config.headers['token'] = token;
  }
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  function (response) {
    nProgress.done();
    let {code,data} = response.data;
    if(code == 102){
      msgBox('error',data)
    }
    if(code == 603){
      msgBox('warning',data)
    }
    if(code == 20000){
      if(typeof data !== 'string') {
        data = '成功'
      } 
      msgBox('success',data)
    }
    return response;
  },
  (error) => {
    return Promise.reject(new Error("faile" + error.message));
  }
);

export default requests;
