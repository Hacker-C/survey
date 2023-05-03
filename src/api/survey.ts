import type { GetSurveyForAll, ListSurveyForm, Surveylist, addSurveyForm } from '~/interfaces'
import { httpGet, httpPost } from '~/utils'

/** 用户添加问卷 */
export const addSurvey = (params: addSurveyForm) => {
  return httpPost<number>('/survey', { ...params })
}

/** 用户获取所有问卷（不包含已删除） */
export const getSurveyList = (params: ListSurveyForm) => {
  return httpGet<Surveylist>('/survey', {
    params: { ...params },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 所有用户获取问卷信息（包含基本信息和选项） */
export const getSurveyOverAll = (id: number) => {
  return httpGet<GetSurveyForAll>(`/survey/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
