import axios from "axios"
import config from "../config/index"
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequst {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  getInsideConfig(){
    const config = {
      baseURL:this.baseUrl,
      hearer: {

      }
    }
    return config
  }
  interceptors(interce) {
    // 添加请求拦截器
    interce.axios.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        console.log('拦截处理');
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    interce.axios.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        console.log('处理响应');
        return response;
      },
      function (error) {
        // 对响应错误做点什么
        console.log(error);
        return Promise.reject(error);
      }
    );
  }
  // {
  //   baseUrl:'/api'
  // }
  request (options) {
    const interce = axios.create()
    options = { ...(this.getInsideConfig()),...options }
    console.log(options)
    this.interceptors()
    return insterse(options)
  }
}

export default new HttpRequst()
