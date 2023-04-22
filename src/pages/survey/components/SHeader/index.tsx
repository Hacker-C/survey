import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { IIcon } from '~/components/IIcon'

interface SHeaderProps {
  onToggle: () => void
  collapsed: boolean
}

export function SHeader({ onToggle, collapsed }: SHeaderProps) {
  return (
    <>
      <HeaderLeft onToggle={onToggle} collapsed={collapsed}/>
      <div flex='1'></div>
      <HeaderRight />
    </>
  )
}

function HeaderLeft({ onToggle, collapsed }: SHeaderProps) {
  return <>
    <Button
      type='text'
      icon={
        <IIcon icon={ collapsed ? 'material-symbols:left-panel-open-rounded' : 'material-symbols:right-panel-open'} /> as any
      }
      className='flex-center'
      onClick={onToggle}
    />
  </>
}

function HeaderRight() {
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
        }}>
          登出
        </a>
      ),
      icon: <IIcon icon='mdi:shutdown' />
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <a onClick={e => e.preventDefault()} className='flex-center'>
        <Avatar
          size="large"
          icon={<IIcon icon='ph:user-light'/>}
          src={''}
          className='flex-center'
        />
        <div ml='2'>Hello, Peter</div>
      </a>
  </Dropdown>
  )
}
