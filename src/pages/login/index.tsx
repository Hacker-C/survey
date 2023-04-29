import { Button, Checkbox, Form, Input } from 'antd'
import { LoginSider } from './LoginSider'
import { LoginForm } from './LoginForm'
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

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className='w-100%'>
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}
