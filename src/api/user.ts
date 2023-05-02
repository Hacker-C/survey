import type { ILoginForm, IRegisterForm, IUser, IUserLogin, updateUserPasswordForm, userUpdateForm } from '~/interfaces'
import { httpGet, httpPost, httpPut } from '~/utils'

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

/** 个人获取用户信息 */
export const getUserProfile = () => {
  return httpGet<IUser>('/user', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

/** 个人更新用户信息 */
export const updateUserProfile = (params: userUpdateForm) => {
  return httpPost<IUser>('/user', { ...params })
}

/** 修改密码 */
export const updateUserPassword = (params: updateUserPasswordForm) => {
  return httpPut<{}>('/user/pwd', { ...params })
}
