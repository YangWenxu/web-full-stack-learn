import Vue from 'vue'
import axios from 'axios'
import {MessageBox} from 'element-ui'
// 负责axios的各种配置，前缀，token管理，路由跳转

let service = axios.create({
  timeout:5000,
  baseURL:'/api'
})


export default ({store,redirect})=>{
  service.interceptors.request.use(
    config=>{
      // config.headers.common['dasheng'] = '123'
  
      // 请求拦截器，后续的token管理都在这
      // 我们也可以用vuex来获取
      const token = window.localStorage.getItem('token')
      if(token){
        // 设置一个请求地址白名单
        config.headers.common['Authorization'] = 'Bearer '+token
      }
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
      if(data.code==0){
        // 正常返回
      }else if(data.code==-666){
        // token过期的专用码
        MessageBox.confirm('登录已过期', '过期',{
          confirmButtonText:"登录",
          showCancelButton:false,
          type:"warning"
        }).then(()=>{
          localStorage.removeItem('token')
          // 跳转到登录页 或者使用vuex提交数据
          redirect({path:'/login'})
        })
      }
      // if(dat)
      return data
  
    }
  )
}
// @ 拦截器 管理token



Vue.prototype.$http = service

export const http = service