import { Spin } from 'antd'

export function Fallback() {
  return (
    <div className='w-full absolute top-0 bottom-0 left-0 right-0 flex-center'>
      <Spin size='large' tip='加载中'/>
    </div>
  )
}
