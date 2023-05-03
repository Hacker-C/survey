import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import { userStore } from './user'
import type { MenuItem } from '~/pages/survey/components'
import { IIcon } from '~/components/IIcon'

const adminMenu: MenuItem[] = [
  {
    key: '/admin/profile',
    icon: <IIcon icon="gg:profile"/>,
    label: '个人账号'
  },
  {
    key: '/admin/survey',
    icon: <IIcon icon='ri:survey-line'/>,
    label: '问卷管理'
  },
  {
    key: '/admin/user',
    icon: <IIcon icon='ph:users-four'/>,
    label: '用户管理'
  }
]

const userMenu: MenuItem[] = [
  {
    key: '/survey/create',
    icon: <IIcon icon="material-symbols:add-notes-outline"/>,
    label: '新建问卷'
  },
  {
    key: '/survey/profile',
    icon: <IIcon icon="gg:profile"/>,
    label: '个人账号'
  },
  {
    key: '/survey/list',
    icon: <IIcon icon='material-symbols:list-alt-outline-rounded'/>,
    label: '问卷列表'
  },
  {
    key: '/survey/star',
    icon: <IIcon icon='material-symbols:heart-plus-outline'/>,
    label: '收藏夹'
  },
  {
    key: '/survey/trash',
    icon: <IIcon icon='ph:trash-bold'/>,
    label: '回收站'
  }
]

export const menuStore = proxy<{
  menus: MenuItem[]
  initMenu: () => void
  clearMenu: () => void
}>({
      menus: userStore.role === 0
        ? userMenu
        : userStore.role === 1
          ? adminMenu
          : [],
      initMenu: () => {
        menuStore.menus = userStore.role === 0 ? userMenu : adminMenu
      },
      clearMenu: () => {
        menuStore.menus = []
      }
    })

subscribe(userStore, () => {
  if (userStore.role === null) {
    menuStore.clearMenu()
  } else {
    menuStore.initMenu()
  }
})

devtools(menuStore, { name: 'menuStore', enabled: true })
