import axios from 'axios'
import { useSnapshot } from 'valtio'
import { userStore } from '~/store'

const BASE_URL = 'https://dummyjson.com'
// const BASE_URL = 'http://localhost:8082'
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
    const { token } = useSnapshot(userStore)
    if (token) {
      config.headers.Token = token
    } else {
      delete config.headers.Token
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