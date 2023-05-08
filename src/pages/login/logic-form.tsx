import { useRequest } from 'ahooks'
import { Button, Checkbox, Form, Input } from 'antd'
import { login } from '~/api'
import type { ILoginForm } from '~/interfaces'
import { userStore } from '~/store'
import { useMessage } from '~/hooks'

export function LogicForm() {
  const { contextHolder, success, error } = useMessage()

  const { run, loading } = useRequest(login, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('登录成功', () => {
          userStore.update(res.data!)
        })
      } else {
        error(res?.msg ?? '登录失败')
      }
    },
    onError() {
      error('请求失败')
    }
  })

  function onLogin(values: ILoginForm) {
    run(values)
  }

  return (
    <Form
      layout='vertical'
      className='w70'
      onFinish={onLogin}
    >
      {contextHolder}
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
        <Button type="primary" htmlType="submit" className='w-100%' loading={loading}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}
