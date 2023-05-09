import type { IQuestion } from '~/interfaces'
import { httpDelete, httpGet, httpPost, httpPut } from '~/utils'

export interface IOption {
  id: number
  content: string
  sort: number
}

/** 后台获取问题选项 */
export const listOption = (params: {
  pageNum: number
  pageSize: number
  questionId: number
}) => {
  return httpGet<{
    rows: IQuestion[]
    total: number
  }>('/option', {
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 添加选项 */
export const saveOption = (params: saveOptionModal) => {
  return httpPost<{}>('/option', { ...params })
}

export interface saveOptionModal {
  content: string
  questionId: number
  sort: number
}

/** 更新选项 */
export const updateOption = (params: updateOptionModal) => {
  return httpPut<{}>('/option', { ...params })
}

export interface updateOptionModal {
  content: string
  id: number
  questionId: number
  sort: number
}

/** 删除选项 */
export const deleteOption = () => {
  return httpDelete<{}>('/option', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
