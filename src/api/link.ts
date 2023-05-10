import type { GetSurveyForAll } from '~/interfaces'
import { httpGet } from '~/utils'

export const getLinkBySurveyId = (surveyId: number) => {
  return httpGet<string>('/link/name', {
    params: {
      surveyId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getSurveyByLink = (name: string) => {
  return httpGet<GetSurveyForAll>(`/link/${name}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
