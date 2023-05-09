import React, { useEffect, useState } from 'react'
import { Radio, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import type { IOption } from '~/interfaces'
import { QuestionBox } from '~/components/QuestionBox'
import { listOption } from '~/api'
import { optionStore } from '~/store'

interface SingleChoiceProps {
  title?: string
  options?: IOption[]
  vertical?: boolean
  required?: number
  isModel?: boolean
  questionId?: number
}

const defaultOptions: IOption[] = [
  {
    id: 1,
    content: 'A',
    sort: 1
  },
  {
    id: 2,
    content: 'B',
    sort: 2
  },
  {
    id: 3,
    content: 'C',
    sort: 3
  }
]

export const SingleChoice: React.FC<SingleChoiceProps> = ({ title = '单选题', vertical = false, required = 1, isModel = false, options = defaultOptions, questionId }) => {
  const [value, setValue] = useState(1)
  const { curOptions } = useSnapshot(optionStore)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const { data: res, refresh } = useRequest(() => listOption({ questionId: questionId as number }))

  const localOptions = !isModel
    ? res?.data?.rows ?? []
    : options

  useEffect(refresh, [curOptions])

  return <div onClick={() => {
    !isModel && optionStore.updateCurOptions(res?.data?.rows as IOption[])
  }}>
    <QuestionBox isModel={isModel}>
      <Typography.Title level={5} className={required ? 'requred-tip ' : ''}>{title}</Typography.Title>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction={vertical ? 'vertical' : 'horizontal'}>
          {
            localOptions?.map((option) => {
              return <Radio onClick={e => e.stopPropagation()} key={option.id} value={option.content}>{option.content}</Radio>
            })
          }
        </Space>
      </Radio.Group>
    </QuestionBox>
  </div>
}
