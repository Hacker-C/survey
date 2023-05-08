import type { IQuestion } from '~/interfaces'
import type { Prettify } from '~/utils'
import { httpDelete, httpGet, httpPost, httpPut } from '~/utils'

/** 添加问题 */
export const saveQuestion = (params: Prettify<Omit<IQuestion, 'id'>>) => {
  if (!params?.sort) {
    params.sort = 0
  }
  return httpPost('/question', { ...params })
}

/** 后台获取问题列表 */
export const listQuestion = (params: {
  pageNum: number
  pageSize: number
  surveyId: number
}) => {
  return httpGet<{
    rows: Prettify<(Prettify<IQuestion> & { createTime: string })[]>
    total: number
  }>('/question', {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
}

/** 更新问题 */
export const updateQuestion = (params: Prettify<IQuestion>) => {
  return httpPut('/question', { ...params })
}

/** 删除问题 */
export const deleteQuestion = (id: number) => {
  return httpDelete(`/question/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 获取问卷大纲（问题名称列表） */
export const listQuestionTitleList = (surveyId: number) => {
  return httpGet<{ title: string; id: number }[]>('/question/name', {
    params: { surveyId }
  })
}
