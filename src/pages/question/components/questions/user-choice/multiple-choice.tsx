import React, { useEffect, useState } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import type { IOption } from '~/interfaces'
import { QuestionBox } from '~/components/QuestionBox'
import type { IAnswer } from '~/api'
import { listOption } from '~/api'
import { optionStore } from '~/store'

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

interface SingleChoiceProps {
  onUpdate?: (questionId: number, p: IAnswer[]) => void
  title?: string
  vertical?: boolean
  required?: number
  isModel?: boolean
  questionId?: number
  idx?: number
  options?: IOption[]
}

export const MultipleChoice: React.FC<SingleChoiceProps> = ({
  title = '多选题',
  vertical = false,
  required = 1,
  isModel = false,
  questionId,
  onUpdate,
  idx,
  options = defaultOptions
}) => {
  const { curOptions } = useSnapshot(optionStore)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const [checkedList, setCheckedList] = useState<IOption[]>([])

  const updateCheckedList = (item: IOption) => {
    setCheckedList((list) => {
      const newList = [...list]
      if (newList.some(op => op.id === item.id)) {
        const index = newList.findIndex(op => op.id === item.id)
        newList.splice(index, 1)
      } else {
        newList.push(item)
      }
      onUpdate?.(questionId as number, newList.map((op) => {
        return {
          questionId,
          optionId: op.id,
          content: op.content
        } as IAnswer
      }))
      return newList
    })
  }

  const handleCheckboxChange = (item: IOption) => {
    updateCheckedList(item)
  }

  const { data: res, refresh } = useRequest(() => listOption({ questionId: questionId as number }))

  const localOptions = !isModel
    ? res?.data?.rows.length === 0
      ? options
      : (res?.data?.rows ?? [])
    : defaultOptions

  useEffect(refresh, [curOptions])

  return <div onClick={() => {
    !isModel && optionStore.updateCurOptions(res?.data?.rows as IOption[])
  }}>
    <QuestionBox isModel={isModel}>
      <Typography.Text className={required ? 'requred-tip ' : ''}>{idx}. {title}</Typography.Text>
      <div m='l5 t1'>
        <Space
          direction={vertical ? 'vertical' : 'horizontal'}
          className={vertical ? '' : 'flex flex-wrap'}
        >
          {
            localOptions.map((option) => {
              return <Checkbox
                key={option.id}
                onChange={() => handleCheckboxChange(option)}
                onClick={e => e.stopPropagation()}
              >
                {option.content}
              </Checkbox>
            })
          }
        </Space>
      </div>
    </QuestionBox>
  </div>
}
