import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import type { IQuestion } from '~/interfaces'

export const questionStore = proxy<{
  curQuestion: IQuestion | null // 当前编辑的问题
  questionList: IQuestion[] // 问题列表
  addQuestion: (q: Partial<IQuestion>) => void // 添加问题
  updateCurQuestion: (q: IQuestion) => void // 更新当前问题
  updateQuestionList: (qs: IQuestion[]) => void // 加载问题列表
  deleteQuestion: (id: number) => void // 删除问题
}>({
      curQuestion: null,
      questionList: [],
      addQuestion: (q) => {
        const index = questionStore.curQuestion?.id ?? questionStore.questionList.length
        questionStore.questionList.splice(index, 0, q as IQuestion)
      },
      updateCurQuestion: (q) => {
        if (q.id === questionStore.curQuestion?.id) return
        questionStore.curQuestion = q
      },
      updateQuestionList: (qs) => {
        questionStore.questionList = qs
      },
      deleteQuestion: (id) => {
        const index = questionStore.questionList.findIndex(q => q.id === id)
        questionStore.questionList.splice(index, 1)
      }
    })

subscribe(questionStore, () => {
  if (!questionStore.curQuestion?.type) {
    questionStore.curQuestion = questionStore.questionList.find(q => q.id === questionStore.curQuestion?.id) ?? null
  }
})

devtools(questionStore, { name: 'questionStore', enabled: true })
