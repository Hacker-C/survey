export interface ILoginForm {
  username: string
  password: string
}

export type IRegisterForm = ILoginForm & {
  rePassword: string
}

export interface userUpdateForm {
  avatar: string
  email: string
  gender: number
  nickname: string
  phone: string
}

export interface updateUserPasswordForm {
  oldPassword: string
  newPassword: string
  rePassword: string
}
