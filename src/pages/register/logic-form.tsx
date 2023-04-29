import { Button, Form, Input } from 'antd'
import type { ILoginForm } from '~/interfaces'
import { register } from '~/api'

export function LogicForm() {
  const onRegsiter = (values: ILoginForm) => {
    register(values)
  }

  const [form] = Form.useForm()
  return (
    <Form
      layout='vertical'
      form={form}
      className='w70'
      onFinish={onRegsiter}
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
