import React from 'react'
import { Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface TextViewProps {
  title?: string
  isModel?: boolean
}

export const TextView: React.FC<TextViewProps> = ({ title = '描述信息...', isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Text>{title}</Typography.Text>
  </QuestionBox>
}
