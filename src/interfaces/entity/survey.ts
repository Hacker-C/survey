import type { PageList } from './common'
import type { Prettify } from '~/utils'

export type ListSurvey = Prettify<{
  id: number
  title: string
  description: string
  isLike: number
  status: number
  createTime: string
  expireTime: string
}>

export type GetSurveyForAll = Prettify<{
  id: number
  title: string
  description: string
  nickname: string
  questions: any[]
  expireTime: string
  type: number
}>

export type Surveylist = Prettify<PageList<ListSurvey>>
