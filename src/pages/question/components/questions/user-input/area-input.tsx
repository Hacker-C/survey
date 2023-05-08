import React from 'react'
import { Input, Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'

interface AreaInputProps {
  title?: string
  placeholder?: string
  required?: boolean
  isModel?: boolean
}

export const AreaInput: React.FC<AreaInputProps> = ({ title = '标题', placeholder = '输入一段内容...', required = true, isModel = false }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Title level={5} className={ required ? 'requred-tip' : ''}>{ title }</Typography.Title>
    <Input.TextArea placeholder={placeholder}/>
  </QuestionBox>
}
