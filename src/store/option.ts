import { proxyWithHistory } from 'valtio/utils'
import type { IOption } from '~/api'

export const optionStore = proxyWithHistory<{
  curOptions: IOption[]
}>({
  curOptions: []
})
