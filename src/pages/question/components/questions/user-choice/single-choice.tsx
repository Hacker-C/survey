import React, { useState } from 'react'
import { Radio, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { IOption } from '~/interfaces'

interface SingleChoiceProps {
  title?: string
  options?: IOption[]
  vertical?: boolean
  required?: boolean
}

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
export const SingleChoice: React.FC<SingleChoiceProps> = ({ title = '单选题', vertical = false, required = true }) => {
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return <div
    bg='gray-100'
    p='4'
    m='b2'
    cursor='pointer'
    className='question-border-hover'
  >
    <Typography.Title level={5} className={ required ? 'requred-tip ' : ''}>{ title }</Typography.Title>
    <Radio.Group onChange={onChange} value={value}>
      <Space direction={ vertical ? 'vertical' : 'horizontal'}>
        {
          options.map((option) => {
            return <Radio key={option.id} value={option.content}>{option.content}</Radio>
          })
        }
      </Space>
    </Radio.Group>
  </div>
}
