import { Typography } from 'antd'
import { SearchPanel } from './SearchPanel'

export function SurveyHeader() {
  return (
    <div className='flex items-center'>
      <Typography.Title level={4} className='theme-duration dark:(text-darktext)'>问卷列表</Typography.Title>
      <div flex='1'></div>
      <div mr='4' text='base theme-duration dark:(text-darktext)'>
        时间顺序
      </div>
      <div mr='4' text='base theme-duration dark:(text-darktext)'>
        状态
      </div>
      <SearchPanel />
    </div>
  )
}
