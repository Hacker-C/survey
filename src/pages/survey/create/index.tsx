import { useRequest } from 'ahooks'
import type { DatePickerProps } from 'antd'
import { Button, Card, DatePicker, Form, Input } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '~/hooks'
import { addSurvey } from '~/api'

export function SurveyCreate() {
  const { success, error, contextHolder } = useMessage()
  const nav = useNavigate()

  const [form] = Form.useForm<{
    title: string
    expireTime: Dayjs
    description: string
  }>()
  const [selectedDate, setSelectedDate] = useState(dayjs())

  const onChange = (
    value: DatePickerProps['value']
  ) => {
    setSelectedDate(value as Dayjs)
  }

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
    const params = { ...data, expireTime: data.expireTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSS') }
    run(params)
  }

  const range = (start: number, end: number) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }
  const disabledDate = (current: Dayjs) => {
    // 只能选择当天之后的日期
    return current.isBefore(dayjs().startOf('day'))
  }
  const disabledDateTime = (current: Dayjs) => {
    // 只能选择当前时间之后
    const curHour = dayjs().hour()
    const curMin = dayjs().minute()
    const curSec = dayjs().second()
    if (current && current.isSame(selectedDate, 'day')) {
      return {
        disabledHours: () => range(0, 24).splice(0, curHour),
        disabledMinutes: () => range(0, curMin),
        disabledSeconds: () => [0, curSec]
      }
    }
  }

  return <div>
    <h2 text='xl center' font='bold' m='b5'>创建问卷</h2>
    <div p='x10' className='flex-center'>
      <Card
        title="从空白创建问卷"
        style={{ width: 400 }}
      >
        <Form
          form={form}
          layout='vertical'
          size='large'
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
            rules={[{ type: 'object' as const, required: true, message: '请选择截止时间' }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={onChange}
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              placeholder='请选择截止时间'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={onSave} size='large' loading={loading}>立即创建</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    {contextHolder}
  </div>
}
