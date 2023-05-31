import { useRequest } from 'ahooks'
import { Button, Checkbox, Form, Input } from 'antd'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import { login } from '~/api'
import type { ILoginForm } from '~/interfaces'
import { loginStore, userStore } from '~/store'
import { useMessage } from '~/hooks'
import { decrypt, encrypt } from '~/utils'

export function LogicForm() {
  const { contextHolder, success, error } = useMessage()
  const { state } = useSnapshot(loginStore)

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
    if (state?.remember) {
      loginStore.updateUser({ ...values, password: encrypt(values.password), remember: true })
    }
    run(values)
  }

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ ...state, password: state?.password ? decrypt(state.password) : undefined })
  }, [])

  return (
    <Form
      layout='vertical'
      className='w70'
      onFinish={onLogin}
      form={form}
    >
      {contextHolder}
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder='请输入用户名' />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type='password' placeholder='请输入密码' />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox onChange={(e) => {
          const checked = e.target.checked
          if (checked) {
            loginStore.updateUser({ ...form.getFieldsValue(), password: encrypt(form.getFieldValue('password')) })
          } else {
            loginStore.clearUser()
          }
        }}>记住我</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className='w-100%' loading={loading}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}
