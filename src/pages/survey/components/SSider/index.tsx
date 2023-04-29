import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { LogoLeft } from '~/components/LogoLeft'
import { themeStore } from '~/store'

export type MenuItem = Required<MenuProps>['items'][number]

export interface SSiderProps {
  collapsed: boolean
  menus: MenuItem[]
}

export const SSider: React.FC<SSiderProps> = ({ collapsed, menus }) => {
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
        items={menus}
        className='text-base theme-duration'
      />
    </>
  )
}
