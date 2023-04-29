import { LoginSider } from '../login/LoginSider'
import { LoginForm } from '../login/LoginForm'
import { LogicForm } from './logic-form'
import { LoginLayout } from '~/layouts/LoginLayout'
import RegisterSider from '~/assets/svgs/register-sider.svg'

export function Register() {
  return (
    <>
      <LoginLayout
        sider={<LoginSider
          cover={RegisterSider}
          title='用最简单的步骤完成注册，即可快速开始问卷调查和统计'
          description='在线问卷调查平台，致力于为用户提供专业、简便、高效的数据收集服务。'
        />}
      >
        <LoginForm
          title={'欢迎注册！'}
          isLogin={false}
        >
          <LogicForm />
        </LoginForm>
      </LoginLayout>
    </>
  )
}
