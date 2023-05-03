import type { PageList } from './common'
import type { Prettify } from '~/utils'

/** loginUser */
export type IUserLogin = Prettify<{
  id: number
  token: string
  nickname: string
  role: number
  avatar: string
}>

/** getUser */
export type IUser = Prettify<{
  avatar: string
  email: string
  gender: number
  nickname: string
  phone: string
}>

/** listUser */
export type ListUser = Prettify<IUser & {
  id: number
  status: number
}>

/** UserList */
export type UserList = Prettify<PageList<ListUser>>
