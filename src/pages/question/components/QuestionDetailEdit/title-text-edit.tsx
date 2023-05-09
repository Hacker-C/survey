import { Button, Form, Input } from 'antd'
import { useSnapshot } from 'valtio'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { questionStore } from '~/store'
import { updateQuestion } from '~/api'
import { useMessage } from '~/hooks'
import type { IQuestion } from '~/interfaces'
import { SEPERATOR } from '~/constant'

export const TitleTextEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const { value } = useSnapshot(questionStore)
  const { curQuestion, updateCurQuestion } = value
  const { id: surveyId } = useParams()
  const [form] = Form.useForm()
  const [title, description] = curQuestion?.title.split(SEPERATOR) ?? []
  useEffect(() => {
    form.setFieldsValue({ title, description })
  }, [curQuestion])
  const onFinish = () => {
    const params = {
      ...curQuestion,
      title: [form.getFieldValue('title'), form.getFieldValue('description')].join(SEPERATOR),
      surveyId
    }
    updateQuestion(params as unknown as IQuestion).then((res) => {
      if (res.code === 201) {
        error(res.msg)
      }
      if (res.code === 200) {
        success('已保存')
      }
    })
  }
  return <div>
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      initialValues={{ title, description }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '标题不能为空' }]}
      >
        <Input onInput={(e) => {
          const fullTitle = [e.currentTarget.value, description].join(SEPERATOR)
          updateCurQuestion({ ...curQuestion, title: fullTitle } as IQuestion)
        }}/>
      </Form.Item>
      <Form.Item
        label="描述信息"
        name="description"
        rules={[{ required: true, message: '描述信息不能为空' }]}
      >
        <Input onInput={(e) => {
          const fullTitle = [title, e.currentTarget.value].join(SEPERATOR)
          updateCurQuestion({ ...curQuestion, title: fullTitle } as IQuestion)
        }}/>
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
