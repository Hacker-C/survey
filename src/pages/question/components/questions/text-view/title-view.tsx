import React from 'react'
import { Typography } from 'antd'

interface TitleViewProps {
  title: string
  description: string
}

export const TitleView: React.FC<TitleViewProps> = ({ title = '标题', description = '描述信息' }) => {
  return <div
    text='center'
    bg='gray-100'
    p='y3'
    cursor="pointer"
    m='y2'
    border='2 solid transparent hover:gray-300'
  >
    <Typography.Title level={4}>{ title }</Typography.Title>
    <Typography.Text>{ description }</Typography.Text>
  </div>
}
