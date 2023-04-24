import { Typography } from 'antd'
import { SearchPanel } from './SearchPanel'
import { IIcon } from '~/components/IIcon'

export function SurveyHeader() {
  return (
    <div className='flex items-center'>
      <Typography.Title level={4} className='theme-duration dark:(text-darktext)'>问卷列表</Typography.Title>
      <div flex='1'></div>
      <div
        mr='4'
        text='base theme-duration dark:(text-darktext)'
        className='flex items-center cursor-pointer'
      >
        <span className='mr1'>时间顺序</span>
        <IIcon icon='solar:round-sort-vertical-linear' />
      </div>
      <div mr='4' text='base theme-duration dark:(text-darktext)'>
        状态
      </div>
      <SearchPanel />
    </div>
  )
}
