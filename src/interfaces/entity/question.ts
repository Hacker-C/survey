import type { IOption } from './option'
import type { QuestionType } from '~/constant'

export interface IQuestion {
  id: number
  type: QuestionType
  required: number
  surveyId: number
  title: string
  sort?: number
  options: IOption[]
}
