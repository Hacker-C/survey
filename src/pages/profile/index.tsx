import { Avatar, Button, Card, Descriptions, Spin, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { useRequest } from 'ahooks'
import { IIcon } from '~/components/IIcon'
import type { IUser } from '~/interfaces'
import { themeStore } from '~/store'
import { DarkThemeText } from '~/components/DarkThemeText'
import { getUserProfile } from '~/api'

const { Meta } = Card
const { Title } = Typography

export function Profile() {
  const { theme } = useSnapshot(themeStore)

  const { data: res, loading } = useRequest(getUserProfile)
  const user = res?.data

  const getLabel = (key: keyof IUser) => {
    return new Map([
      ['nickname', '昵称'],
      ['gender', '性别'],
      ['email', '邮箱'],
      ['phone', '手机号'],
      ['avatar', '头像']
    ]).get(key)
  }

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
        {
          loading
            ? <div className='flex-center h72'><Spin /></div>
            : <>
              <Meta
                title={<div className='theme-duration dark:(text-darktext)'>{user?.nickname}</div>}
                description={<div className='theme-duration dark:(text-darktext)'>{user?.email ?? '暂未设置邮箱'}</div>}
                avatar={
                  <Avatar
                    src={user?.avatar}
                    icon={<IIcon icon='ph:user-bold' width={'30'} />}
                    size={'large'}
                    style={{ width: 55, height: 55 }}
                    className='flex-center'
                  />
                }
              />
              <Descriptions layout="vertical" bordered className='mt5 theme-duration dark:bg-gray-800' >
                {
                  Object.keys(user ?? {}).map((key) => {
                    return (
                      <Descriptions.Item
                        label={<DarkThemeText>{getLabel(key as keyof IUser)}</DarkThemeText>}
                        key={key}
                        className='theme-duration dark:(text-darktext)'
                      >
                        {
                          key === 'gender'
                            ? (user![key as keyof IUser] === 1 ? '男' : '女')
                            : user![key as keyof IUser] ?? '暂未设置'
                        }
                      </Descriptions.Item>
                    )
                  })
                }
              </Descriptions>
            </>
        }

      </Card>
    </>
  )
}
