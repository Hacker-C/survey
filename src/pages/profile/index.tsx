import { Avatar, Button, Card, Descriptions, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { PasswordUpdate } from './update-psw'
import { IIcon } from '~/components/IIcon'
import { profileStore, themeStore } from '~/store'
import { DarkThemeText } from '~/components/DarkThemeText'

const { Meta } = Card
const { Title } = Typography

export function Profile() {
  const { theme } = useSnapshot(themeStore)
  const { profile } = useSnapshot(profileStore)

  return (
    <>
      <Card
        bordered={false}
        title={<Title level={4} className='theme-duration dark:(text-darktext)'>个人信息</Title>}
        extra={
          <Button
            type={theme === 'dark' ? 'primary' : 'default'}
            icon={<IIcon icon='material-symbols:edit' width={'20'} className='mr1' /> as any}
            className='flex-center'
          >
            编辑
          </Button>
        }
        className='theme-duration dark:(bg-gray-800 text-darktext) min-h-screen-xm'
      >
        <Meta
          title={<div className='theme-duration dark:(text-darktext)'>{profile?.nickname}</div>}
          description={<div className='theme-duration dark:(text-darktext)'>{profile?.email ?? '暂未设置邮箱'}</div>}
          avatar={
            <Avatar
              src={profile?.avatar}
              icon={<IIcon icon='ph:user-bold' width={'30'} />}
              size={'large'}
              style={{ width: 55, height: 55 }}
              className='flex-center'
            />
          }
        />
        <Descriptions layout="vertical" bordered className='mt5 theme-duration dark:bg-gray-800' >
          <Descriptions.Item
            label={<DarkThemeText>昵称</DarkThemeText>}
            className='theme-duration dark:(text-darktext)'
          >
            {profile?.nickname}
          </Descriptions.Item>
          <Descriptions.Item
            label={<DarkThemeText>性别</DarkThemeText>}
            className='theme-duration dark:(text-darktext)'
          >
            { profile?.gender === 0 ? '女' : '男' }
          </Descriptions.Item>
          <Descriptions.Item
            label={<DarkThemeText>邮箱</DarkThemeText>}
            className='theme-duration dark:(text-darktext)'
          >
            { profile?.email ?? <IIcon icon='ic:round-not-interested'/> }
          </Descriptions.Item>
          <Descriptions.Item
            label={<DarkThemeText>电话 </DarkThemeText>}
            className='theme-duration dark:(text-darktext)'
          >
            { profile?.phone ?? <IIcon icon='ic:round-not-interested'/> }
          </Descriptions.Item>
          <Descriptions.Item
            label={<DarkThemeText>安全</DarkThemeText>}
            className='theme-duration dark:(text-darktext)'
          >
            <PasswordUpdate />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}
