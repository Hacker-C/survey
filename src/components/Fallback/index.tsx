import { Spin } from 'antd'
import React from 'react'

export function Fallback() {
  return (
    <div className='w-sreen h100 flex-center'>
      <Spin size='large' tip='加载中'/>
    </div>
  )
}
