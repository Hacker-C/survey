import React from 'react'
import { Input, Typography } from 'antd'
import { QuestionBox } from '~/components/QuestionBox'
import type { IAnswer } from '~/api'

interface LineInputProps {
  title?: string
  placeholder?: string
  required?: boolean
  isModel?: boolean
  onUpdate?: (x: IAnswer) => void
  questionId: number
  idx?: number
}

export const LineInput: React.FC<LineInputProps> = ({ title = '标题', placeholder = '输入一行内容...', required = true, isModel = false, onUpdate, questionId, idx }) => {
  return <QuestionBox isModel={isModel}>
    <Typography.Text className={required ? 'requred-tip' : ''}>{idx}. {title}</Typography.Text>
    <div m='l5 t2'>
      <Input type="text" placeholder={placeholder} onInput={(e) => {
        const content = e.currentTarget.value
        onUpdate?.({
          content,
          questionId
        } as IAnswer)
      }} />
    </div>
  </QuestionBox>
}
