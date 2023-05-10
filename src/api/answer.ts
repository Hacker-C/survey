import { httpGet, httpPost } from '~/utils'

/** 添加问卷 */
export const saveAnswer = (params: {
  answers: IAnswer[]
  surveyId: number
}) => {
  return httpPost('/answer', { ...params })
}

export interface IAnswer {
  content: string
  optionId: number
  questionId: number
}

/** 问卷分析 */
export const analysisAnswer = (id: number) => {
  return httpGet<any>(`/answer/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
