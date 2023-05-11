import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { optionStore, questionStore } from '~/store'
import type { IOption, saveOptionModal } from '~/api'
import { deleteOption, saveOption, updateOption, updateQuestion } from '~/api'
import { useMessage } from '~/hooks'
import type { IQuestion } from '~/interfaces'
import { IIcon } from '~/components/IIcon'

const { Paragraph } = Typography

export const SingleChoiceEdit = () => {
  const { success, error, contextHolder } = useMessage()
  const { value } = useSnapshot(questionStore)
  const { updateCurQuestion } = value
  const { curOptions } = useSnapshot(optionStore)

  const { id: surveyId } = useParams()

  // FEAT 编辑问题标题，是否必答
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ ...value.curQuestion, required: !!value.curQuestion?.required })
  }, [value])
  const onFinish = () => {
    const params = {
      ...form.getFieldsValue(),
      ...value.curQuestion,
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

  // FEAT 添加选项
  const [optionForm] = Form.useForm()
  const addOption = () => {
    const params = {
      questionId: value.curQuestion?.id,
      sort: 0,
      ...optionForm.getFieldsValue()
    }
    saveOption(params as saveOptionModal).then((res) => {
      if (res.code === 201) {
        error(res.msg)
      } else {
        optionStore.addCurOption(params as IOption)
        optionForm.setFieldValue('content', '')
      }
    })
  }

  return <div>
    <Typography.Title level={5}>问题设置</Typography.Title>
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      initialValues={{ ...value.curQuestion, required: !!value.curQuestion?.required }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '标题不能为空' }]}
      >
        <Input onInput={(e) => {
          updateCurQuestion({ ...value.curQuestion, title: e.currentTarget.value } as IQuestion)
        }} />
      </Form.Item>
      <Form.Item
        label="是否必答"
        name="required"
        valuePropName="checked"
      >
        <Checkbox onChange={(e) => {
          updateCurQuestion({ ...value.curQuestion, required: e.target.checked ? 1 : 0 } as IQuestion)
        }}>必答</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" w='100%'>
          保存
        </Button>
      </Form.Item>

    </Form>

    <div>
      <Typography.Title level={5}>选项设置</Typography.Title>
      {curOptions.map((option) => {
        return <EditableOption option={option} key={option.id}/>
      })
      }
    </div>

    <Form
      form={optionForm}
      onFinish={addOption}
    >
      <Form.Item
        name='content'
        rules={[{ required: true, message: '选项不能为空' }]}
      >
        <Input placeholder='请输入选项内容' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType="submit" className='flex-center w-100%'>
          <IIcon icon='material-symbols:add-circle-outline-rounded' />
          <span m='l1'>添加选项</span>
        </Button>
      </Form.Item>
    </Form>

    {contextHolder}
  </div>
}

function EditableOption({ option }: { option: IOption }) {
  const { error, contextHolder } = useMessage()
  const { value } = useSnapshot(questionStore)

  // FEAT 修改选项内容
  const onOptionChange = (str: string) => {
    if (str === option.content) return
    updateOption({ ...option, content: str, questionId: value.curQuestion!.id })
      .then((res) => {
        if (res.code === 201) {
          error(res.msg)
        } else {
          optionStore.updateCurOption({ ...option, content: str })
        }
      })
  }

  // FEAT 删除选项
  const onDeleteOption = () => {
    deleteOption(option.id).then((res) => {
      if (res.code === 201) {
        error(res.msg)
      } else {
        optionStore.deleteCurOption(option.id)
      }
    })
  }

  return <div key={option.id} className='pl4 flex relative'>
  <Paragraph
    editable={{
      icon: <IIcon icon='solar:pen-2-bold' className='absolute right-10 top-0'/>,
      triggerType: 'icon' as const,
      onChange: onOptionChange,
      enterIcon: <IIcon icon='fluent:arrow-enter-left-24-filled'/>
    }}
  >
    {option.content}
  </Paragraph>
  <div flex='1' />
  <IIcon icon='material-symbols:delete-rounded' className='cursor-pointer hover:text-primary mr2' onClick={onDeleteOption}/>
  {contextHolder}
</div>
}
