import type { Prettify } from '~/utils'

export type addSurveyForm = Prettify<{
  title: string
  expireTime: string
  description: string
}>
