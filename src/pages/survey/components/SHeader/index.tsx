import type { MenuProps } from 'antd'
import { Avatar, Dropdown } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '~/api'
import { IIcon } from '~/components/IIcon'
import { themeStore, userStore } from '~/store'

interface SHeaderProps {
  onToggle: () => void
  collapsed: boolean
}

export function SHeader({ onToggle, collapsed }: SHeaderProps) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('theme') ?? 'false') === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <>
      <HeaderLeft onToggle={onToggle} collapsed={collapsed} />
      <div flex='1' className='theme-duration'></div>
      <HeaderRight />
    </>
  )
}

function HeaderLeft({ onToggle, collapsed }: SHeaderProps) {
  return <>
    <IIcon
      icon={collapsed ? 'material-symbols:left-panel-open-rounded' : 'material-symbols:right-panel-open'}
      onClick={onToggle}
      className='cursor-pointer'
    />
  </>
}

function HeaderRight() {
  const { toggle, theme } = themeStore
  const nav = useNavigate()
  const toggleDark = () => {
    toggle()
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/survey/profile'>
          个人账号
        </Link>
      ),
      icon: <IIcon icon='gg:profile' />
    },
    {
      key: '2',
      label: (
        <a onClick={() => {
          logout().then((res) => {
            if (res.code === 200) {
              userStore.clear()
              nav('/login')
            }
          })
        }}>
          登 出
        </a>
      ),
      icon: <IIcon icon='mdi:shutdown' />
    }
  ]

  return (
    <>
      <IIcon
        icon={theme === 'light' ? 'ph:moon' : 'ph:sun'}
        onClick={toggleDark}
        className='cursor-pointer mr4'
      />
      <Dropdown menu={{ items }}>
        <a onClick={e => e.preventDefault()} className='flex-center'>
          <Avatar
            size="large"
            icon={<IIcon icon='ph:user-light' />}
            src={''}
            className='flex-center'
          />
          <div ml='2'>Hello, Peter</div>
        </a>
      </Dropdown>
    </>

  )
}
