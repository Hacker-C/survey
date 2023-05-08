import { AreaInput, LineInput, MultipleChoice, SingleChoice, TextView, TitleText, TitleView } from '~/pages/question/components/questions'
import { QuestionType } from '~/constant'

export function genComponent(type: QuestionType) {
  return new Map([
    [QuestionType.TITLE_TEXT_VIEW, TitleText],
    [QuestionType.TITLE_VIEW, TitleView],
    [QuestionType.TEXT_VIEW, TextView],
    [QuestionType.SINGLE_CHOICE, SingleChoice],
    [QuestionType.MULTIPLE_CHOICE, MultipleChoice],
    [QuestionType.LINE_INPUT, LineInput],
    [QuestionType.AREA_INPUT, AreaInput]
  ]).get(type as any)
}
