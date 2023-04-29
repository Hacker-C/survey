import { LoginSider } from './LoginSider'
import { LoginForm } from './LoginForm'
import { LogicForm } from './logic-form'
import { LoginLayout } from '~/layouts/LoginLayout'
import LoginCover from '~/assets/svgs/login-sider.svg'

export function Login() {
  return (
    <>
      <LoginLayout
        isLeft={true}
        sider={<LoginSider
          cover={LoginCover}
          title='简洁、效率至上，马上创建一份问卷并分布，查看统计数据'
          description='在线问卷调查平台，致力于为用户提供专业、简便、高效的数据收集服务。'
        />}
      >
        <LoginForm
          title={'欢迎回来！'}
        >
          <LogicForm />
        </LoginForm>
      </LoginLayout>
    </>
  )
}
