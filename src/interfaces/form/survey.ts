import type { PageParams } from './common'
import type { Prettify } from '~/utils'

export type addSurveyForm = Prettify<{
  title: string
  expireTime: string
  description: string
}>

export type ListSurveyForm = PageParams<{
  status?: number
  surveyName?: string
}>
