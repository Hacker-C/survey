import React from 'react'
import { Typography } from 'antd'

interface TitleTextProps {
  title?: string
  description?: string
}

export const TitleText: React.FC<TitleTextProps> = ({ title = '标题', description = '描述信息...' }) => {
  return <div
    text='center'
    bg='gray-100'
    p='y3'
    cursor="pointer"
    m='y2'
    className='question-border-hover'
  >
    <Typography.Title level={4}>{ title }</Typography.Title>
    <Typography.Text>{ description }</Typography.Text>
  </div>
}
