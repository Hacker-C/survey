import type { Prettify } from '~/utils'

export type ILoginForm = Prettify<{
  username: string
  password: string
}>

export type IRegisterForm = Prettify<ILoginForm & {
  rePassword: string
}>

export type userUpdateForm = Prettify<{
  avatar: string
  email: string
  gender: number
  nickname: string
  phone: string
}>

export type updateUserPasswordForm = Prettify<{
  oldPassword: string
  newPassword: string
  rePassword: string
}>
