import { Spin } from 'antd'
import React from 'react'

export function Fallback({ path }: { path: string }) {
  // if (['/', '/login', '/register'].includes(path)) {
  //   return (
  //     <div className='w-full h-sreen flex-center'>
  //       <Spin size='large' tip='加载中'/>
  //     </div>
  //   )
  // }
  return (
    <div className='w-full absolute top-0 bottom-0 left-0 right-0 flex-center'>
      <Spin size='large' tip='加载中'/>
    </div>
  )
}
