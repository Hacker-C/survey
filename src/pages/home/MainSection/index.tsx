import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { LogoLeft } from '~/components/LogoLeft'
import { userStore } from '~/store'

const { Title, Paragraph } = Typography

export function MainSection() {
  const { role } = useSnapshot(userStore)

  return (
    <>
      <div className='flex items-center'>
        <div className='w50'>
          <LogoLeft />
        </div>
        <div flex='1' />
        <div>
          <Link to={'/login'}>
            <Button size='large'>登 录</Button>
          </Link>
          <Link to={'/register'}>
            <Button m='x2' type='primary' size='large'>免费注册</Button>
          </Link>
        </div>
      </div>
      <div
        className='min-section-h flex'
        flex='col justify-center items-center'
      >
        <Title level={1} font='deyihei'>在线调查问卷系统</Title>
        <Paragraph font='deyihei' text='xl'>
          简单、快速、有趣——马上创建您的第一份调查问卷，以更深入了解您的调查对象。(*^_^*)
        </Paragraph>
        <div>
          <Link to={ role === 0 ? '/survey' : '/admin'}>
            <Button size={'large'} shape={'round'} type={'primary'}>开始使用</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
