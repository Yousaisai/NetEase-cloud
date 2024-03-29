/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 21:34:39
 * @LastEditTime: 2021-09-29 15:53:22
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/cookie'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://49.4.1.72:3000', // url = base url + request url
  baseURL: "https://autumnfish.cn/", //这个是官方的接口
  // baseURL: 'http://49.4.79.236:3000', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['token'] = getToken()
    // }
    if (config&&config.params&&config.params.auth) {
      // config.headers['token'] = getToken("token")

      config.params["cookie"]=getToken("token")
    }
    
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
      return res
    // }
  },
  (error,val) => {
    console.log('err' + error,val) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
