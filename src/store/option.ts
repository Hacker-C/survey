import { devtools } from 'valtio/utils'
import { proxy } from 'valtio'

import type { IOption } from '~/api'

export const optionStore = proxy<{
  curOptions: IOption[]
  updateCurOptions: (options: IOption[]) => void
  addCurOption: (option: IOption) => void
  deleteCurOption: (id: number) => void
}>({
      curOptions: [],
      updateCurOptions: (options) => {
        optionStore.curOptions = options
      },
      addCurOption: (option) => {
        optionStore.curOptions.push(option)
      },
      deleteCurOption: (id) => {
        const index = optionStore.curOptions.findIndex(item => item.id === id)
        optionStore.curOptions.splice(index, 1)
      },
      updateCurOption: (option) => {
        optionStore.curOptions = optionStore.curOptions.map((item) => {
          if (item.id === option.id) {
            return option
          }
          return item
        })
      }
    })

devtools(optionStore, { name: 'optionStore', enabled: true })
