import type { ILoginForm, IRegisterForm, IUser, IUserLogin, PageParams, UserList, updateUserPasswordForm, userUpdateForm } from '~/interfaces'
import { httpDelete, httpGet, httpPost, httpPut } from '~/utils'

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

/** 管理员获取用户列表 */
export const getUserList = (params: PageParams<{ nickname?: string }>) => {
  return httpGet<UserList>('/user/list', {
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

/** 禁用用户 */
export const disableUser = (id: number, status: 0 | 1) => {
  return httpPut<{}>(`/user/${id}`, { status }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

/** 删除用户 */
export const deleteUser = (id: number) => {
  return httpDelete<{}>(`/user/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}
