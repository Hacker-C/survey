import { Link } from 'react-router-dom'
import { Logo } from '~/components/LogoLeft'

interface LoginFormProps {
  title: string
  isLogin?: boolean
  children: React.ReactNode
}

export function LoginForm(props: LoginFormProps) {
  const { title, isLogin = true, children } = props
  return (
    <div className='h-full flex flex-col justify-center items-center' font='deyihei'>
      <Link to={'/'} className='flex items-center'>
        <Logo />
        <h1 text='2xl primary' font='bold' m='l2'>在线调查问卷系统</h1>
      </Link>
      <h2 text='xl' m='y5'>{title}</h2>

      {children}

      {
        isLogin
          ? <div m='t5'>没有账号？ <Link to={'/register'} text='primary'>去注册</Link></div>
          : <div m='t5'>已有账号？ <Link to={'/login'} text='primary'>立即登录</Link></div>
      }

    </div>
  )
}
