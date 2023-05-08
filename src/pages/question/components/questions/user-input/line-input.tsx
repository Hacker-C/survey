import React from 'react'
import { Input, Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface LineInputProps {
  title?: string
  placeholder?: string
  required?: boolean
  isModel?: boolean
}

export const LineInput: React.FC<LineInputProps> = ({ title = '标题', placeholder = '输入一行内容...', required = true, isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Title level={5} className={ required ? 'requred-tip' : ''}>{ title }</Typography.Title>
    <Input type="text" placeholder={placeholder}/>
  </QuestionBox>
}
