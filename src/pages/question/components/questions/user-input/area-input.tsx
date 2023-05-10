import React from 'react'
import { Input, Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'
import type { IAnswer } from '~/api'

interface AreaInputProps {
  title?: string
  placeholder?: string
  required?: boolean
  isModel?: boolean
  onUpdate?: (x: IAnswer) => void
  questionId: number
}

export const AreaInput: React.FC<AreaInputProps> = ({ title = '标题', placeholder = '输入一段内容...', required = true, isModel = false, onUpdate, questionId }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Text className={ required ? 'requred-tip' : ''}>{ title }</Typography.Text>
    <Input.TextArea placeholder={placeholder} onInput={(e) => {
      const content = e.currentTarget.value
      onUpdate?.({
        content,
        questionId
      } as IAnswer)
    }}/>
  </QuestionBox>
}
