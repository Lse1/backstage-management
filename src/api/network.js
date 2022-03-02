import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// import Vue from 'vue'

// axios.defaults.baseURL = 'http://localhost:3002/'
axios.defaults.baseURL = 'http://106.55.188.48:3002/'
// axios.defaults.baseURL = 'http://106.55.188.48:3000/'
axios.defaults.timeout = 5000
// let count = 0
// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('1231')
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  // console.log('1232')
  // Vue.hiddenLoading()
  return Promise.reject(error)
})

// // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('1233')
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.log('1234')
  console.log(error)
  router.push({ name: 'register' })
  Message.error('请登录')
  return Promise.reject(error)
})
export default {
  get: function (path = '', data = {}) {
    // console.log('1235')
    return new Promise(function (resolve, reject) {
      // console.log('1236')
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          // console.log('1237')
          // console.log(response.data)
          resolve(response.data)
        })
        .catch(function (error) {
          // console.log('1238')
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    // console.log('1239')
    return new Promise(function (resolve, reject) {
      // console.log('1240')
      // console.log(data)
      axios.post(path, data)
      // axios.post(path, {
      //   params: data
      // })
        .then(function (response) {
          // console.log('1241')
          resolve(response.data)
        })
        .catch(function (error) {
          // console.log('1242')
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
