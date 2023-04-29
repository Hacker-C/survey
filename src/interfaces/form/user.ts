export interface ILoginForm {
  username: string
  password: string
}

export type IRegisterForm = ILoginForm & {
  rePassword: string
}
