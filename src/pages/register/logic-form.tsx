import { Button, Form, Input, message } from 'antd'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import type { IRegisterForm } from '~/interfaces'
import { register } from '~/api'

export function LogicForm() {
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useNavigate()

  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg
    }).then(() => {
      nav('/login')
    })
  }

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg
    })
  }

  const { loading, run } = useRequest(register, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('注册成功，请前往登录')
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
      <Button onClick={() => success('111')}>触发</Button>
    </Form>
  )
}
