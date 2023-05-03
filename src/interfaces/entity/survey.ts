import type { Prettify } from '~/utils'

export type ISurvey = Prettify<{
  createTime: string
  description: string
  expireTime: string
  id: number
  status: number
  title: string
}>
