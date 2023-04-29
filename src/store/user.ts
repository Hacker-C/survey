import { proxy, subscribe } from 'valtio'
import type { IUserLogin } from '~/interfaces'

export const userStore = proxy<{
  user: IUserLogin | null
  token: string | null
}>({
  user: null,
  token: localStorage.getItem('token') ?? null
})

subscribe(userStore, () => {
  if (userStore.token) {
    localStorage.setItem('token', userStore.token)
  } else {
    localStorage.removeItem('token')
  }
})
