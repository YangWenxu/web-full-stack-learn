import Vue from 'vue'
import axios from 'axios'

// 负责axios的各种配置，前缀，token管理，路由跳转

let service = axios.create({
  timeout:5000,
  baseURL:'/api'
})

// @ 拦截器 管理token
service.interceptors.request.use(
  config=>{
    // 请求拦截器，后续的token管理都在这
    return config
  },
  err=>{
    return Promise.reject(err)
  }
)
// 响应拦截器
service.interceptors.response.use(
  async response=>{
    // header config这里处理就可以了，应用层只需要数据data
    let {data} = response
    // if(dat)
    return data

  }
)


Vue.prototype.$http = service

export const http = service