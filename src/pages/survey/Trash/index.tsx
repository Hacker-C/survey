import { Typography } from 'antd'
import { SearchPanel } from '~/components/SearchPanel'

export function SurveyTrash() {
  return (
    <>
      <div className='flex items-center'>
      <Typography.Title level={4} className='theme-duration dark:(text-darktext)'>问卷列表</Typography.Title>
      <div flex='1'></div>
      <SearchPanel />
    </div>
    </>
  )
}
