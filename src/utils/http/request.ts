import instance from './instance'
import type { Delete, Get, Post, Put } from './type'

/**
 * get方法
 * @param  url 请求路径
 * @param config 请求参数配置
 */
export const httpGet: Get = async (url, config) => {
  const response = await instance.get(url, { ...config })
  return response.data
}

/**
 * post 方法
 * @param url 请求路径
 * @param data 请求参数
 * @param config 请求配置
 */
export const httpPost: Post = async (url, data, config) => {
  const response = await instance.post(url, data, { ...config })
  return response.data
}

/**
 * put 方法
 * @param url 请求路径
 * @param data 请求参数
 * @param config 请求配置
 */
export const httpPut: Put = async (url: string, data?: string | object, config?: any) => {
  const response = await instance.put(url, data, { ...config })
  return response.data
}

/**
 * delete 方法
 * @param url 请求路径
 * @param config 请求配置
 */
export const httpDelete: Delete = async (url, config) => {
  const response = await instance.delete(url, { ...config })
  return response.data
}
