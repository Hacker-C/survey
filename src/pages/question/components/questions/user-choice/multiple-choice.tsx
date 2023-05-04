import React, { useState } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import type { IOption } from '~/interfaces'

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
  required?: boolean
}

export const MultipleChoice: React.FC<SingleChoiceProps> = ({
  title = '多选题',
  vertical = false,
  required = true
}) => {
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

  return <div
    bg='gray-100'
    p='4'
    m='b2'
    cursor='pointer'
    className='question-border-hover'
  >
    <Typography.Title level={5} className={required ? 'requred-tip ' : ''}>{title}</Typography.Title>
    <Space direction={ vertical ? 'vertical' : 'horizontal'}>
      {
        options.map((option) => {
          return <Checkbox key={option.id} onChange={() => handleCheckboxChange(option.content)}>{option.content}
          </Checkbox>
        })
      }
    </Space>
  </div>
}
