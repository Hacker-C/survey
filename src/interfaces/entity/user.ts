import type { PageList } from './common'

/** loginUser */
export interface IUserLogin {
  id: number
  token: string
  nickname: string
  role: number
  avatar: string
}

/** getUser */
export interface IUser {
  avatar: string
  email: string
  gender: number
  nickname: string
  phone: string
}

/** listUser */
export type ListUser = IUser & {
  id: number
  status: number
}

/** UserList */
export type UserList = PageList<ListUser>
