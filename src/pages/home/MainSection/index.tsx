import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { LogoLeft } from '~/components/LogoLeft'
import { userStore } from '~/store'

const { Title, Paragraph } = Typography

export function MainSection() {
  const { role } = useSnapshot(userStore)

  return (
    <div className='home-bg'>
      <div className='flex items-center'>
        <div className='w50'>
          <LogoLeft />
        </div>
        <div flex='1' />
        <div>
          <Link to={'/login'}>
            <Button size='large' type='primary'>前往登录</Button>
          </Link>
          <Link to={'/register'}>
            <Button m='x2' type='primary' size='large'>免费注册</Button>
          </Link>
        </div>
      </div>
      <div
        className='min-h-80px flex'
        flex='col justify-center items-center'
      >
        <Title level={1} font='deyihei'><span text='white'>在线调查问卷系统</span></Title>
        <Paragraph font='deyihei' text='xl white'>
          简单、快速、有趣——马上创建您的第一份调查问卷，以更深入了解您的调查对象。(*^_^*)
        </Paragraph>
        <div>
          <Link to={role === 0 ? '/survey' : '/admin'}>
            <Button size={'large'} type={'primary'} style={{
              height: '50px',
              width: '150px'
            }}>
              <span text='xl' >
                开始使用
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
