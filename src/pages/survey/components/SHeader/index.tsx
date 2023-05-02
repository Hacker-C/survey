import type { MenuProps } from 'antd'
import { Avatar, Dropdown } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import { getUserProfile, logout } from '~/api'
import { IIcon } from '~/components/IIcon'
import { menuStore, profileStore, themeStore, userStore } from '~/store'
import { useMessage } from '~/hooks'

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
  const { success, error, contextHolder } = useMessage()
  const { toggle, theme } = themeStore
  const { update, profile } = useSnapshot(profileStore)

  useRequest(getUserProfile, {
    onSuccess: (res) => {
      if (res.code === 200) {
        update(res.data!)
      } else {
        error(res.msg ?? '获取用户信息失败')
      }
    }
  })

  const toggleDark = () => {
    toggle()
  }

  const onLogout = () => {
    logout().then((res) => {
      if (res.code === 200) {
        success('登出成功', () => {
          userStore.clear()
          menuStore.clearMenu()
        })
      } else {
        error(res.msg ?? '登出失败')
      }
    })
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
        <a onClick={onLogout}>
          登 出
        </a>
      ),
      icon: <IIcon icon='mdi:shutdown' />
    }
  ]

  return (
    <>
      { contextHolder }
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
            src={profile?.avatar}
            className='flex-center'
          />
          <div ml='2'>Hello, { profile?.nickname }</div>
        </a>
      </Dropdown>
    </>

  )
}
