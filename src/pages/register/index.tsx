import { Button, Form, Input } from 'antd'
import { LoginSider } from '../login/LoginSider'
import { LoginForm } from '../login/LoginForm'
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
          < LogicForm />
        </LoginForm>
      </LoginLayout>
    </>
  )
}

function LogicForm() {
  const [form] = Form.useForm()
  return (
    <Form
      layout='vertical'
      form={form}
      className='w70'
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder='请输入用户名'/>
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type='password' placeholder='请输入密码'/>
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="rePassword"
        rules={[{ required: true, message: '请再次输入密码' }]}
      >
        <Input type='password' placeholder='请再次输入密码'/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className='w-100%'>
          注 册
        </Button>
      </Form.Item>
    </Form>
  )
}
