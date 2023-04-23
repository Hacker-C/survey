import type { MenuTheme } from 'antd'
import { proxy, subscribe } from 'valtio'

export const themeStore = proxy({
  theme: JSON.parse(localStorage.getItem('theme') ?? '"light"') as MenuTheme,
  toggle: () => {
    if (themeStore.theme === 'dark') {
      themeStore.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      themeStore.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  }
}
)

subscribe(themeStore, () => {
  localStorage.setItem('theme', JSON.stringify(themeStore.theme))
})
