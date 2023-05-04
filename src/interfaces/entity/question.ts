import type { Prettify } from '~/utils'

export type IQuestion = Prettify<{
  id: number
  type: number
  required: number
  surveyId: number
  title: string
}>
