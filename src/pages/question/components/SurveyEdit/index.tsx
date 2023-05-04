import { Button, Form, Input, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { getSurveyList, updateSurvey } from '~/api'
import { SuDatePicker } from '~/components/SuDatePicker'
import { formatTime } from '~/utils'
import { useMessage } from '~/hooks'

export const SurveyEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const [form] = Form.useForm<{
    title: string
    description: string
    expireTime: string
  }>()

  const { id } = useParams()

  const { data: res, refresh, run: runGetSurveyList } = useRequest(() => getSurveyList({
    pageNum: 1,
    pageSize: 200
  }), { manual: true })
  useEffect(() => {
    runGetSurveyList()
  }, [])
  const surveyList = res?.data?.rows ?? []
  const survey = surveyList.find(item => item.id === +id!)
  useEffect(() => {
    form.setFieldsValue({
      title: survey?.title,
      description: survey?.description,
      expireTime: survey?.expireTime
    })
  }, [survey])

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
          success('更新成功', refresh)
        } else {
          error(res.msg)
        }
      }
    }
  )

  const onSave = () => {
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
        <div>
          <div m='b2'>
            <Typography.Text>已选择：{formatTime(survey?.expireTime)}</Typography.Text>
          </div>
          <SuDatePicker onSuOk={onSuOk} defaultValue={survey?.expireTime} />
        </div>
      </Form.Item>
      <Form.Item>
        <Button type='primary' onClick={onSave} w='100%' loading={loading}>更新问卷</Button>
      </Form.Item>
    </Form>
    {contextHolder}
  </div>
}
