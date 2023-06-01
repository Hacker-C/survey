import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'
import type { ListSurvey } from '~/interfaces'

type CSurvey = Pick<ListSurvey, 'id' | 'title' | 'description' | 'expireTime'>

export const surveyStore = proxy<{
  curSurvey: CSurvey | null
  updateCurSurvey: (val: CSurvey) => void
  modelVisible: boolean
  updateModelVisible: (val: boolean) => void
  submittedSurveysIds: number[]
  makeSubmit: (id: number) => void
}>({
      curSurvey: null,
      updateCurSurvey: (val: CSurvey) => {
        surveyStore.curSurvey = val
      },

      modelVisible: false,
      updateModelVisible: (val: boolean) => {
        surveyStore.modelVisible = val
      },

      submittedSurveysIds: JSON.parse(localStorage.getItem('submitted') ?? '[]'),
      makeSubmit: (id: number) => {
        surveyStore.submittedSurveysIds.push(id)
        localStorage.setItem('submitted', JSON.stringify(surveyStore.submittedSurveysIds))
      }
    })

devtools(surveyStore, { name: 'surveyStore', enabled: true })
