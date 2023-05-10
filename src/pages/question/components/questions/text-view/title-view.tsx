import React from 'react'
import { Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface TitleViewProps {
  title?: string
  isModel?: boolean
}

export const TitleView: React.FC<TitleViewProps> = ({ title = '标题', isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Title level={5} >{ title }</Typography.Title>
  </QuestionBox>
}
