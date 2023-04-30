import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import type { IUserLogin } from '~/interfaces'

export const userStore = proxy<{
  user: IUserLogin | null
  token: string | null
  role: number | null
  update: (user: IUserLogin) => void
  clear: () => void
}>({
      user: null,
      token: localStorage.getItem('token'),
      role: JSON.parse(`${localStorage.getItem('role')}`),
      update: (user: IUserLogin) => {
        userStore.user = user
      },
      clear: () => {
        userStore.user = null
        userStore.token = null
        userStore.role = null
      }
    })

subscribe(userStore, () => {
  if (userStore.user) {
    userStore.token = userStore.user.token
    userStore.role = userStore.user.role
    localStorage.setItem('token', userStore.user?.token)
    localStorage.setItem('role', `${userStore.user.role}`)
  } else {
    userStore.token = null
    userStore.role = null
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }
})

devtools(userStore, { name: 'userStore', enabled: true })
