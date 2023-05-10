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
  return httpGet<IAnalysisAnswer>(`/answer/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export interface IAnalysisAnswer {
  description: string
  expireTime: string
  nickname: string
  questions: AQuestion[]
  title: string
  total: number
}

export interface AQuestion {
  options: AOption[]
  required: number
  sort: number
  title: string
  type: number
}

export interface AOption {
  content: string
  number: number
  percent: number
}
