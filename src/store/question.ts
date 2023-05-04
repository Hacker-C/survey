/* eslint-disable @typescript-eslint/indent */
import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'
import type { ListSurvey } from '~/interfaces'

type CSurvey = Pick<ListSurvey, 'id' | 'title' | 'description' | 'expireTime'>

export const questionStore = proxy<{
  question: null
  curSurvey: CSurvey | null
  updateCurSurvey: (val: CSurvey) => void
}>({
  question: null,
  curSurvey: null,
  updateCurSurvey: (val: CSurvey) => {
    questionStore.curSurvey = val
  }
})

devtools(questionStore, { name: 'questionStore', enabled: true })
