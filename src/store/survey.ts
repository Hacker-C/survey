import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'
import type { ListSurvey } from '~/interfaces'

type CSurvey = Pick<ListSurvey, 'id' | 'title' | 'description' | 'expireTime'>

export const surveyStore = proxy<{
  curSurvey: CSurvey | null
  updateCurSurvey: (val: CSurvey) => void
  modelVisible: boolean
  updateModelVisible: (val: boolean) => void
}>({
      curSurvey: null,
      updateCurSurvey: (val: CSurvey) => {
        surveyStore.curSurvey = val
      },
      modelVisible: false,
      updateModelVisible: (val: boolean) => {
        surveyStore.modelVisible = val
      }
    })

devtools(surveyStore, { name: 'surveyStore', enabled: true })
