import React from 'react'
import { Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface TextViewProps {
  description?: string
  isModel?: boolean
}

export const TextView: React.FC<TextViewProps> = ({ description = '描述信息...', isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Text>{description}</Typography.Text>
  </QuestionBox>
}
