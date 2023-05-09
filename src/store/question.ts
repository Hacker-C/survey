import { subscribe } from 'valtio'
import { devtools, proxyWithHistory } from 'valtio/utils'
import type { IQuestion } from '~/interfaces'

export const questionStore = proxyWithHistory<{
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
        const index = questionStore.value.curQuestion?.id ?? questionStore.value.questionList.length
        questionStore.value.questionList.splice(index, 0, q as IQuestion)
      },
      updateCurQuestion: (q) => {
        const originQ = questionStore.value.curQuestion
        const newQ = { ...originQ, ...q }
        questionStore.value.curQuestion = newQ
        questionStore.value.questionList = questionStore.value.questionList.map((item) => {
          if (item.id === questionStore.value.curQuestion?.id) {
            return questionStore.value.curQuestion
          }
          return item
        })
      },
      updateQuestionList: (qs) => {
        questionStore.value.questionList = qs
      },
      deleteQuestion: (id) => {
        const index = questionStore.value.questionList.findIndex(q => q.id === id)
        questionStore.value.questionList.splice(index, 1)
      }
    })

subscribe(questionStore, () => {
  if (!questionStore.value.curQuestion?.type) {
    questionStore.value.curQuestion = questionStore.value.questionList.find(q => q.id === questionStore.value.curQuestion?.id) ?? null
  }
})

devtools(questionStore, { name: 'questionStore', enabled: true })
