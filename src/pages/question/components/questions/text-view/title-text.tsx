import React from 'react'
import { Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface TitleTextProps {
  title?: string
  description?: string
  isModel?: boolean
}

export const TitleText: React.FC<TitleTextProps> = ({ title = '标题', description = '描述信息...', isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Title level={4}>{ title }</Typography.Title>
    <Typography.Text>{ description }</Typography.Text>
  </QuestionBox>
}
