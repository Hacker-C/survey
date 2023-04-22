import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { LogoLeft } from '~/components/LogoLeft'

const { Title, Paragraph } = Typography

export function MainSection() {
  return (
    <>
      <div className='flex items-center'>
        <div className='w50'>
          <LogoLeft />
        </div>
        <div flex='1' />
        <div>
          <Link to={'/login'}>
            <Button>登 录</Button>
          </Link>
          <Link to={'/register'}>
            <Button m='x2' type='primary'>免费注册</Button>
          </Link>
        </div>
      </div>
      <div
        className='main-section-h flex'
        flex='col justify-center items-center'
      >
        <Title level={1} >在线调查问卷系统</Title>
        <Paragraph>简单、快速、有趣——马上创建您的第一份调查问卷，以更深入了解您的调查对象。(*^_^*)</Paragraph>
        <div>
          <Link to={'/survey/list'}>
            <Button size={'large'} shape={'round'} type={'primary'}>开始使用</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
