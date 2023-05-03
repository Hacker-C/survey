import type { Option } from './option'
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
  options: Option[]
  required: number
  title: string
  type: number
}>

export type Surveylist = Prettify<PageList<ListSurvey>>
