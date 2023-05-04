import type { Prettify } from '~/utils'

export type IOption = Prettify<{
  id: number
  content: string
  sort: number
}>
