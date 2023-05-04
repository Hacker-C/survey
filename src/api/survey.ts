import type { GetSurveyForAll, ListSurveyForm, Surveylist, addSurveyForm } from '~/interfaces'
import { httpDelete, httpGet, httpPost, httpPut } from '~/utils'

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

/** 用户更新收藏 */
export const updateSurveyLike = (id: number, isLike: number) => {
  return httpPut<{}>(`/survey/like/${id}`, { isLike }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 获取收藏列表，没有 status 参数 */
export const getSurveyListLike = (params: ListSurveyForm) => {
  return httpGet<Surveylist>('/survey/like', {
    params: { ...params },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 设置问卷状态 0 未发布 1 发布 2 放入回收站 */
export const updateSurveyStatus = (id: number, status: number) => {
  return httpPut<{}>(`/survey/${id}`, { status }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 发布问卷 */
export const makePublic = (id: number) => {
  return updateSurveyStatus(id, 1)
}

/** 取消发布问卷 */
export const cancelPublic = (id: number) => {
  return updateSurveyStatus(id, 0)
}

/** 放入回收站 */
export const addRecycle = (id: number) => {
  return updateSurveyStatus(id, 2)
}

/** 从回收站恢复 */
export const cancelRecycle = (id: number) => {
  return updateSurveyStatus(id, 0)
}

/** 获取回收站的问卷，没有 status */
export const getRecycleList = (params: ListSurveyForm) => {
  return httpGet<Surveylist>('/survey/recycle', {
    params: { ...params },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/** 删除问卷 */
export const deleteSurvey = (id: number) => {
  return httpDelete(`/survey/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
