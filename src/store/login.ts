import { proxy } from 'valtio'

interface LoginState {
  username: string | null
  password: string | null
  remember: boolean
}

export const loginStore = proxy<{
  state: LoginState | null
  updateUser: (state: LoginState) => void
  clearUser: () => void
}>({
      state: JSON.parse(localStorage.getItem('remember') ?? 'null'),
      updateUser: (state: LoginState) => {
        loginStore.state = state
        localStorage.setItem('remember', JSON.stringify(state))
      },
      clearUser: () => {
        loginStore.state = null
        localStorage.removeItem('remember')
      }
    })
