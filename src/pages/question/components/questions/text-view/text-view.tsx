import React from 'react'
import { Typography } from 'antd'

interface TextViewProps {
  description?: string
}

export const TextView: React.FC<TextViewProps> = ({ description = '描述信息...' }) => {
  return <div
    bg='gray-100'
    p='y3 l3'
    cursor="pointer"
    m='y2'
    className='question-border-hover'
  >
    <Typography.Text>{ description }</Typography.Text>
  </div>
}
