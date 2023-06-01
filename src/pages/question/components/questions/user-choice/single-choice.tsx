import React, { useEffect, useState } from 'react'
import { Radio, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import type { IOption } from '~/interfaces'
import { QuestionBox } from '~/components/QuestionBox'
import type { IAnswer } from '~/api'
import { listOption } from '~/api'
import { optionStore } from '~/store'

interface SingleChoiceProps {
  title?: string
  vertical?: boolean
  required?: number
  isModel?: boolean
  questionId?: number
  onUpdate?: (x: IAnswer) => void
  idx?: number
  options?: IOption[]
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

export const SingleChoice: React.FC<SingleChoiceProps> = ({
  title = '单选题',
  vertical = false,
  required = 1,
  isModel = false,
  options = defaultOptions,
  questionId,
  onUpdate,
  idx
}) => {
  const { curOptions } = useSnapshot(optionStore)

  const [value, setValue] = useState()
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const { data: res, refresh } = useRequest(() => listOption({ questionId: questionId as number }))

  const localOptions = !isModel
    ? res?.data?.rows.length === 0 ? options : res?.data?.rows
    : defaultOptions

  useEffect(refresh, [curOptions])

  return <div onClick={() => {
    !isModel && optionStore.updateCurOptions(res?.data?.rows as IOption[])
  }}>
    <QuestionBox isModel={isModel}>
      <Typography.Text className={required ? 'requred-tip ' : ''}>{idx}. {title}</Typography.Text>
      <br />
      <div m='l5 t1'>
        <Radio.Group onChange={onChange} value={value}>
          <Space
            direction={vertical ? 'vertical' : 'horizontal'}
            className={vertical ? '' : 'flex flex-wrap'}
          >
            {
              localOptions?.map((option) => {
                return <Radio
                  key={option.id}
                  value={option.content}
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdate?.({ optionId: option.id, content: option.content, questionId: questionId as number })
                  }}
                >
                  {option.content}
                </Radio>
              })
            }
          </Space>
        </Radio.Group>
      </div>
    </QuestionBox>
  </div>
}
