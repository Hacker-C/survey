import { Button, Card, Tag } from 'antd'
import { IIcon } from '~/components/IIcon'
import type { ListSurvey } from '~/interfaces'
import { formatTime } from '~/utils'

interface SurveyItemProps {
  survey: ListSurvey
}

export function SurveyItem({ survey }: SurveyItemProps) {
  const { id, title, description, isLike, status, createTime, expireTime } = survey
  return (
    <>
      <Card
        title={
          <div className='theme-duration dark:(text-darktext) my3'>
            <div className='mr3'>{title}</div>
            <div className='text-sm font-normal'>{description}</div>
          </div>
        }
        extra={
          <div className='flex items-center theme-duration dark:(text-darktext)'>
            <span className='mr3'>ID: {id}</span>
            <Tag color={status === 0 ? 'orange' : 'blue'} className='mr3'>{status === 0 ? '未发布' : '已发布'}</Tag>
            <span className='mr3'>答卷：{10}</span>
            <span className='mr3'>创建：{formatTime(createTime)}</span>
            <span>截止：{formatTime(expireTime)}</span>
          </div>
        }
        hoverable
        className='mt5 theme-duration dark:(bg-dark text-darktext)'
      >
        <div className='flex items-center'>
          <div className='flex'>
            <Button
              type='text'
              icon={<IIcon icon='iconoir:page-edit' className='mr2 text-sky-500' width='23' /> as any}
              className='mr4 survey-item-bottom'
            >
              设计问卷
            </Button>
            <Button
              type='text'
              icon={<IIcon icon='mingcute:send-plane-line' className='mr2 text-orange-500' width='23' /> as any}
              className='mr4 survey-item-bottom'
            >
              发送问卷
            </Button>
            <Button
              type='text'
              className='mr4 survey-item-bottom'
              icon={<IIcon icon='ic:round-pie-chart' className='mr2 text-purple-500' width='23' /> as any}
            >
              统计分析
            </Button>
          </div>
          <div flex='1'></div>
          <div className='flex'>
            <Button
              type='text'
              size='small'
              icon={<IIcon icon='material-symbols:play-circle' className='mr1' /> as any}
              className='mr2 survey-item-bottom'
            >
              发布
            </Button>
            <Button
              type='text'
              size='small'
              icon={<IIcon icon={isLike ? 'ic:baseline-star-rate' : 'ic:outline-star-border' } className='mr1' /> as any}
              className='mr2 survey-item-bottom'
            >
              { isLike ? '已收藏' : '收藏' }
            </Button>
            <Button
              type='text'
              size='small'
              icon={<IIcon icon='ph:copy-simple-bold' className='mr1' /> as any}
              className='mr2 survey-item-bottom'
            >
              复制
            </Button>
            <Button
              type='text'
              size='small'
              icon={<IIcon icon='material-symbols:delete' className='mr1' /> as any}
              className='survey-item-bottom'
            >
              删除
            </Button>

          </div>
        </div>
      </Card>
    </>
  )
}
