import { Button, Form, Input } from 'antd'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import type { IRegisterForm } from '~/interfaces'
import { register } from '~/api'
import { useMessage } from '~/hooks'

export function LogicForm() {
  const { success, error, contextHolder } = useMessage()
  const nav = useNavigate()

  const { loading, run } = useRequest(register, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('注册成功，正在前往登录', () => {
          nav('/login')
        })
      } else {
        error(res?.msg ?? '注册失败')
      }
    }
  })

  const onRegsiter = (values: IRegisterForm) => {
    run(values)
  }

  const [form] = Form.useForm()
  return (
    <Form
      layout='vertical'
      form={form}
      className='w70'
      onFinish={onRegsiter}
    >
      { contextHolder }
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder='请输入用户名' allowClear />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password type='password' placeholder='请输入密码' allowClear />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="rePassword"
        rules={[{ required: true, message: '请再次输入密码' }]}
      >
        <Input.Password type='password' placeholder='请再次输入密码' allowClear />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className='w-100%' loading={loading}>
          注 册
        </Button>
      </Form.Item>
    </Form>
  )
}
