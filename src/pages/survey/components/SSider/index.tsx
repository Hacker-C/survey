import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { LogoLeft } from '~/components/LogoLeft'
import { IIcon } from '~/components/IIcon'
import { themeStore } from '~/store'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '/question/edit',
    icon: <IIcon icon="material-symbols:add"/>,
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
    icon: <IIcon icon='material-symbols:star'/>,
    label: '收藏夹'
  },
  {
    key: '/survey/trash',
    icon: <IIcon icon='ph:trash-bold'/>,
    label: '回收站'
  }
]

export const SSider: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const { theme } = useSnapshot(themeStore)

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  return (
    <>
      <LogoLeft collapsed={collapsed}/>
      <Menu
        theme={theme}
        onClick={onClick}
        selectedKeys={[pathname]}
        mode="inline"
        items={items}
        className='text-base theme-duration'
      />
    </>
  )
}
