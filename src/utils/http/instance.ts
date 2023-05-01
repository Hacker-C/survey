import axios from 'axios'
import { userStore } from '~/store'

const BASE_URL = import.meta.env.VITE_REACT_APP_URL
const TIMEOUT = 5000

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json;charset=utf-8'
  },
  validateStatus() {
    return true
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 设置 token
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {
      message: '请求异常'
    }

    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
