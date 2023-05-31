import { useRequest } from 'ahooks'
import { Button, Card, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { CreateModel } from './create-model'
import { useMessage } from '~/hooks'
import { addSurvey } from '~/api'
import { SuDatePicker } from '~/components/SuDatePicker'
import { surveyStore } from '~/store'

export function SurveyCreate() {
  const { success, error, contextHolder } = useMessage()
  const nav = useNavigate()

  const [form] = Form.useForm<{
    title: string
    expireTime: string
    description: string
  }>()

  const { loading, run } = useRequest(addSurvey, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        success('创建成功', () => {
          // 前往问卷编辑页面
          nav(`/question/edit/${res.data}`)
        })
      } else {
        error(res.msg)
      }
    },
    onError: (err) => {
      error(err.message)
    }
  })

  const onSave = async () => {
    await form.validateFields()
    const data = form.getFieldsValue()
    run(data)
  }

  const { modelVisible } = useSnapshot(surveyStore)

  return <>
    <h2 text='xl center' font='bold' m='b5'>创建问卷</h2>
    {
      modelVisible
        ? <CreateModel closeModel={() => surveyStore.updateModelVisible(false)} />
        : <div>
          <div p='x10' className='flex-center'>
            <Card
              title="从空白创建问卷"
              style={{ width: 400 }}
            >
              <Form
                form={form}
                layout='vertical'
              >
                <Form.Item
                  label={<span text='base' className='dark:text-white'>请输入问卷标题</span>}
                  name='title'
                  rules={[{ required: true, message: '请输入问卷标题' }]}
                >
                  <Input placeholder='请输入问卷标题' />
                </Form.Item>
                <Form.Item
                  label={<span text='base' className='dark:text-white'>请输入问卷描述</span>}
                  name='description'
                  rules={[{ required: true, message: '请输入问卷描述' }]}
                >
                  <Input.TextArea
                    placeholder='请输入问卷描述'
                    autoSize={{ minRows: 3, maxRows: 200 }}
                  />
                </Form.Item>
                <Form.Item
                  label={<span text='base' className='dark:text-white'>请选择问卷的截止时间</span>}
                  name='expireTime'
                  rules={[{ required: true, message: '请选择截止时间' }]}
                >
                  <SuDatePicker onSuOk={(v) => {
                    form.setFieldValue('expireTime', v)
                  }} />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' onClick={onSave} loading={loading} w='100%'>立即创建</Button>
                </Form.Item>
              </Form>
            </Card>
            <Card
              title="从已有模板创建问卷"
              style={{ width: 400, marginLeft: 40 }}
            >
              <Form
                form={form}
                layout='vertical'
              >
                <Form.Item
                  label={<span text='base' className='dark:text-white'>XXXXXXXXxxxxxxx</span>}
                  name='title'
                  rules={[{ required: true, message: '请输入问卷标题' }]}
                >
                  <Input placeholder='请输入问卷标题' disabled />
                </Form.Item>
                <Form.Item
                  label={<span text='base' className='dark:text-white'>YYYYYYyyyyyyy</span>}
                  name='description'
                  rules={[{ required: true, message: '请输入问卷描述' }]}
                >
                  <Input.TextArea
                    placeholder='请输入问卷描述'
                    autoSize={{ minRows: 3, maxRows: 200 }}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label={<span text='base' className='dark:text-white'>YYYY-MMMM-DDDD</span>}
                  name='expireTime'
                  rules={[{ required: true, message: '请选择截止时间' }]}
                >
                  <SuDatePicker onSuOk={(v) => {
                    form.setFieldValue('expireTime', v)
                  }} disabled />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' onClick={() => {
                    surveyStore.updateModelVisible(true)
                  }} loading={loading} w='100%'>查看所有模板</Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
          {contextHolder}
        </div>
    }
  </>
}
