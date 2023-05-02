import { Button, Form, Input, Modal, Radio } from 'antd'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import { IIcon } from '~/components/IIcon'
import { updateUserProfile } from '~/api'
import { useMessage } from '~/hooks'
import { profileStore, themeStore } from '~/store'
import { ImageUpload } from '~/components/ImageUpload'
import type { userUpdateForm } from '~/interfaces'

export const UpdateProfile: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { error, success, contextHolder } = useMessage()
  const { theme } = useSnapshot(themeStore)
  const { update, profile } = useSnapshot(profileStore)

  const [form] = Form.useForm<userUpdateForm>()
  const { loading, run } = useRequest(updateUserProfile, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('修改成功', () => {
          update(form.getFieldsValue())
          setOpen(false)
        })
      } else {
        error(res.msg!)
      }
    }
  })
  const onSaveProfile = async () => {
    await form.validateFields()
    run(form.getFieldsValue())
  }
  const onUpload = (url: string) => {
    form.setFieldValue('avatar', url)
  }
  return (
    <>
      <Button
        type={theme === 'dark' ? 'primary' : 'default'}
        icon={<IIcon icon='material-symbols:edit' width={'20'} className='mr1' /> as any}
        className='flex-center'
        onClick={() => setOpen(true)}
      >
        编辑资料
      </Button>
      <Modal
        title="修改个人信息"
        open={open}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onSaveProfile}>
            保存
          </Button>
        ]}
      >
        <Form
          form={form}
          layout='horizontal'
          initialValues={profile as any}
        >
          <Form.Item
            label='昵称'
            name='nickname'
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder='请输入昵称'/>
          </Form.Item>
          <Form.Item
            label='邮箱'
            name='email'
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item
            label='电话'
            name='phone'
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input placeholder='请输入电话' />
          </Form.Item>
          <Form.Item
            label='性别'
            name='gender'
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Radio.Group >
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='头像'
            name='avatar'
          >
            <ImageUpload originUrl={profile?.avatar} onSuccess={onUpload}/>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  )
}
