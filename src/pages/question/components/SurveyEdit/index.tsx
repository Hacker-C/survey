import { Button, Form, Input } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router'
import { useSnapshot } from 'valtio'
import { updateSurvey } from '~/api'
import { SuDatePicker } from '~/components/SuDatePicker'
import { useMessage } from '~/hooks'
import { surveyStore } from '~/store'

export const SurveyEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const [form] = Form.useForm<{
    title: string
    description: string
    expireTime: string
  }>()

  const { id } = useParams()
  const { updateCurSurvey, curSurvey } = useSnapshot(surveyStore)

  form.setFieldsValue({
    title: curSurvey?.title,
    description: curSurvey?.description,
    expireTime: curSurvey?.expireTime
  })

  const onSuOk = (value: any) => {
    form.setFieldValue('expireTime', value)
  }

  const { loading, run: runUpdateSurvey } = useRequest(
    () => updateSurvey({
      id: +id!,
      ...form.getFieldsValue()
    }),
    {
      manual: true,
      onSuccess(res) {
        if (res.code === 200) {
          success('更新成功')
        } else {
          error(res.msg)
        }
      }
    }
  )

  const onSave = () => {
    updateCurSurvey({ id: +id!, ...form.getFieldsValue() })
    runUpdateSurvey()
  }

  return <div>
    <Form
      form={form}
      layout='vertical'
    >
      <Form.Item
        label='问卷标题'
        name='title'
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='问卷描述'
        name='description'
        rules={[{ required: true, message: '请输入问卷描述' }]}
      >
        <Input.TextArea
          placeholder='请输入问卷描述'
          autoSize={{ minRows: 3, maxRows: 200 }}
        />
      </Form.Item>
      <Form.Item
        label='截止时间'
        name='expireTime'
        rules={[{ required: true, message: '请选择截止时间' }]}
      >
        <SuDatePicker onSuOk={onSuOk} defaultValue={curSurvey?.expireTime} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' onClick={onSave} w='100%' loading={loading}>更新问卷</Button>
      </Form.Item>
    </Form>
    {contextHolder}
  </div>
}
