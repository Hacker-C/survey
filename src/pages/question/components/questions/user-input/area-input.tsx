import React from 'react'
import { Input, Typography } from 'antd'

interface AreaInputProps {
  title?: string
  placeholder?: string
  required?: boolean
}

export const AreaInput: React.FC<AreaInputProps> = ({ title = '标题', placeholder = '输入一段内容...', required = true }) => {
  return <div bg='gray-100' p='4' className='question-border-hover' m='b2' cursor='pointer'>
    <Typography.Title level={5} className={ required ? 'requred-tip' : ''}>{ title }</Typography.Title>
    <Input.TextArea placeholder={placeholder}/>
  </div>
}
