import { Button, Form, Input } from 'antd'
import { useSnapshot } from 'valtio'
import { useParams } from 'react-router'
import { questionStore } from '~/store'
import { updateQuestion } from '~/api'
import { useMessage } from '~/hooks'
import type { IQuestion } from '~/interfaces'
import { QuestionType } from '~/constant'

export const TitleEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const { curQuestion, updateCurQuestion } = useSnapshot(questionStore)
  const { id: surveyId } = useParams()
  const [form] = Form.useForm()
  const onFinish = () => {
    const params = {
      ...form.getFieldsValue(),
      required: curQuestion?.required,
      type: curQuestion?.type,
      id: curQuestion?.id,
      sort: curQuestion?.sort,
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
  const label = curQuestion?.type === QuestionType.TITLE_VIEW ? '标题' : '描述信息'
  return <div>
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      initialValues={{ ...curQuestion, required: !!curQuestion?.required }}
    >
      <Form.Item
        label={ label }
        name="title"
        rules={[{ required: true, message: `${label}不能为空` }]}
      >
        <Input onInput={(e) => {
          updateCurQuestion({ ...curQuestion, title: e.currentTarget.value } as IQuestion)
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
