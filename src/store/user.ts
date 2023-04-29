import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import type { IUserLogin } from '~/interfaces'

export const userStore = proxy<{
  user: IUserLogin | null
  token: string | null
  update: (user: IUserLogin) => void
  clear: () => void
}>({
      user: null,
      token: localStorage.getItem('token') ?? null,
      update: (user: IUserLogin) => {
        userStore.user = user
      },
      clear: () => {
        userStore.user = null
        userStore.token = null
      }
    })

subscribe(userStore, () => {
  if (userStore.user?.token) {
    userStore.token = userStore.user.token
    localStorage.setItem('token', userStore.user?.token)
  } else {
    userStore.token = null
    localStorage.removeItem('token')
  }
})

devtools(userStore, { name: 'state name', enabled: true })
