import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

// import type { IUser } from '~/interfaces'

export const questionStore = proxy({
  question: null
})

devtools(questionStore, { name: 'questionStore', enabled: true })
