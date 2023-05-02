import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import { updateUserPassword } from '~/api'
import { IIcon } from '~/components/IIcon'
import { themeStore } from '~/store'
import { useMessage } from '~/hooks'

export function PasswordUpdate() {
  const { error, success, contextHolder } = useMessage()
  const { theme } = useSnapshot(themeStore)

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { loading, run } = useRequest(updateUserPassword, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('修改成功', () => {
          setOpen(false)
        })
      } else {
        error(res.msg!)
      }
    }
  })
  const onSavePassword = async () => {
    await form.validateFields()
    run(form.getFieldsValue())
  }
  return (
    <>
      <Button
        type={theme === 'dark' ? 'primary' : 'default'}
        icon={<IIcon icon='mingcute:safe-alert-line' width={'20'} className='mr1' /> as any}
        className='flex items-center'
        onClick={() => setOpen(true)}
      >
        修改密码
      </Button>
      <Modal
        title="修改密码"
        open={open}
        onOk={onSavePassword}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onSavePassword}>
            保存
          </Button>
        ]}
      >
        <Form
          form={form}
          layout='horizontal'
          className='w70'
          onFinish={onSavePassword}
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input placeholder='请输入旧密码' />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input type='password' placeholder='请输入新密码' />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="rePassword"
            rules={[
              { required: true, message: '请再次输入新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              })
            ]}
          >
            <Input type='password' placeholder='请确认新密码' />
          </Form.Item>
        </Form>
      </Modal>
      { contextHolder }
    </>
  )
}
