import React, { useEffect, useState } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useSnapshot } from 'valtio'
import type { IOption } from '~/interfaces'
import { QuestionBox } from '~/components/QuestionBox'
import { listOption } from '~/api'
import { optionStore } from '~/store'

const options: IOption[] = [
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
  title?: string
  options?: IOption[]
  vertical?: boolean
  required?: number
  isModel?: boolean
  questionId?: number
}

export const MultipleChoice: React.FC<SingleChoiceProps> = ({
  title = '多选题',
  vertical = false,
  required = 1,
  isModel = false,
  questionId
}) => {
  const { curOptions } = useSnapshot(optionStore)
  const [checkedList, setCheckedList] = useState<string[]>([])

  const updateCheckedList = (item: string) => {
    setCheckedList((list) => {
      const newList = [...list]
      if (newList.includes(item)) {
        const index = newList.indexOf(item)
        newList.splice(index, 1)
      } else {
        newList.push(item)
      }
      return newList
    })
  }

  const handleCheckboxChange = (item: string) => {
    updateCheckedList(item)
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
      <Space
        direction={vertical ? 'vertical' : 'horizontal'}
        className={vertical ? '' : 'flex flex-wrap'}
      >
        {
          localOptions.map((option) => {
            return <Checkbox
              key={option.id}
              onChange={() => handleCheckboxChange(option.content)}
              onClick={e => e.stopPropagation()}
            >
              {option.content}
            </Checkbox>
          })
        }
      </Space>
    </QuestionBox>
  </div>
}
