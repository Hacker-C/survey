import { Button, Checkbox, Form, Input } from 'antd'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { questionStore } from '~/store'
import { updateQuestion } from '~/api'
import { useMessage } from '~/hooks'
import type { IQuestion } from '~/interfaces'

export const LineInputEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const { value } = useSnapshot(questionStore)
  const { curQuestion, updateCurQuestion } = value
  const { id: surveyId } = useParams()
  const [form] = Form.useForm()
  const onFinish = () => {
    const params = {
      ...form.getFieldsValue(),
      ...curQuestion,
      required: form.getFieldsValue().required ? 1 : 0,
      surveyId
    }
    updateQuestion(params).then((res) => {
      if (res.code === 201) {
        error(res.msg)
      }
      if (res.code === 200) {
        success('已保存')
      }
    })
  }
  useEffect(() => {
    form.setFieldsValue({ ...curQuestion, required: !!curQuestion?.required })
  }, [curQuestion])
  return <div>
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'

    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '标题不能为空' }]}
      >
        <Input onInput={(e) => {
          updateCurQuestion({ ...curQuestion, title: e.currentTarget.value } as IQuestion)
        }}/>
      </Form.Item>
      <Form.Item
        label="是否必答"
        name="required"
        valuePropName="checked"
      >
        <Checkbox onChange={(e) => {
          updateCurQuestion({ ...curQuestion, required: e.target.checked ? 1 : 0 } as IQuestion)
        }}>必答</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" w='100%'>
          保存
        </Button>
    </Form.Item>
    </Form>
    { contextHolder }
  </div>
}
