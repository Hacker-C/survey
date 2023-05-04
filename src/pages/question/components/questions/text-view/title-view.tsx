import React from 'react'
import { Typography } from 'antd'

interface TitleViewProps {
  title?: string
}

export const TitleView: React.FC<TitleViewProps> = ({ title = '标题' }) => {
  return <div
    text='center'
    bg='gray-100'
    p='y3'
    cursor="pointer"
    m='y2'
    className='question-border-hover'
  >
    <Typography.Title level={4}>{ title }</Typography.Title>
  </div>
}
