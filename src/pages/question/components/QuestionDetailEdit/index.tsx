import { useSnapshot } from 'valtio'
import { TitleEdit } from './title-edit'
import { TitleTextEdit } from './title-text-edit'
import { LineInputEdit } from './line-input-edit'
import { SingleChoiceEdit } from './single-choice-edit'
import { QuestionType } from '~/constant'
import { questionStore } from '~/store'

export const QuestionDetailEdit = () => {
  const { value } = useSnapshot(questionStore)
  const { curQuestion } = value
  if (curQuestion?.type === QuestionType.TITLE_VIEW || curQuestion?.type === QuestionType.TEXT_VIEW) {
    return <TitleEdit />
  }
  if (curQuestion?.type === QuestionType.TITLE_TEXT_VIEW) {
    return <TitleTextEdit />
  }
  if (curQuestion?.type === QuestionType.LINE_INPUT || curQuestion?.type === QuestionType.AREA_INPUT) {
    return <LineInputEdit />
  }
  if (curQuestion?.type === QuestionType.SINGLE_CHOICE || curQuestion?.type === QuestionType.MULTIPLE_CHOICE) {
    return <SingleChoiceEdit/>
  }
  return <>other</>
}
