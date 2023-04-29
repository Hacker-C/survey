import type { ILoginForm, IRegisterForm, IUserLogin } from '~/interfaces'
import { httpPost } from '~/utils'

/** 登录 */
export const login = (params: ILoginForm) => {
  return httpPost<IUserLogin>('/login', { ...params })
}

/** 注册 */
export const register = (params: IRegisterForm) => {
  return httpPost<{}>('/register', { ...params })
}
