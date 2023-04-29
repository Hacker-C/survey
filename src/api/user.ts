import type { ILoginForm, IRegisterForm, IUserLogin } from '~/interfaces'
import { httpPost } from '~/utils'

/** 登录 */
export const login = (params: ILoginForm) => {
  return httpPost<IUserLogin>('/user/login', { ...params }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

/** 注册 */
export const register = (params: IRegisterForm) => {
  return httpPost<{}>('/user/register', { ...params })
}

/** 登出 */
export const logout = () => {
  return httpPost<{}>('/user/logout', { }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}
