import { Button, Card, Tag } from 'antd'
import { useState } from 'react'
import { IIcon } from '~/components/IIcon'
import type { ListSurvey } from '~/interfaces'
import { formatTime } from '~/utils'
import { addRecycle, cancelPublic, makePublic, updateSurveyLike } from '~/api'
import { useMessage } from '~/hooks'

interface SurveyItemProps {
  survey: ListSurvey
  refresh?: () => void
}

export function SurveyItem({ survey, refresh }: SurveyItemProps) {
  const { success, error, contextHolder } = useMessage()
  const { id, title, description, isLike, status, createTime, expireTime } = survey

  const [like, seLike] = useState(isLike)
  const [statu, seStatu] = useState(status)

  /** 收藏问卷 */
  const onLike = () => {
    updateSurveyLike(id, like === 0 ? 1 : 0)
      .then((res) => {
        if (res.code === 200) {
          seLike(like === 0 ? 1 : 0)
          success(like === 0 ? '已收藏' : '已取消收藏', () => {
            refresh?.()
          })
        } else {
          error(res.msg)
        }
      }).catch((err) => {
        error(err.message)
      })
  }

  /** 发布问卷 */
  const onPublic = () => {
    const fn = statu === 0 ? makePublic : cancelPublic
    fn(id)
      .then((res) => {
        if (res.code === 200) {
          seStatu(statu === 0 ? 1 : 0)
          success(statu === 0 ? '成功发布问卷' : '已撤销发布')
        } else {
          error(res.msg)
        }
      }).catch((err) => {
        error(err.message)
      })
  }

  /** 放入回收站 */
  const onAddRecycle = () => {
    addRecycle(id)
      .then((res) => {
        if (res.code === 200) {
          success('已删除', () => {
            refresh()
          })
        } else {
          error(res.msg)
        }
      }).catch((err) => {
        error(err.message)
      })
  }

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
            <Tag color={statu === 0 ? 'orange' : 'blue'} className='mr3'>{statu === 0 ? '未发布' : '已发布'}</Tag>
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
              onClick={onPublic}
              className='mr2 survey-item-bottom'
              style={{
                color: statu === 1 ? '#18a058' : ''
              }}
            >
              <IIcon icon='material-symbols:play-circle' className='mr1' />
              { statu === 0 ? '发布' : '已发布' }
            </Button>
            <Button
              type='text'
              size='small'
              onClick={onLike}
              className='mr2 survey-item-bottom'
              style={{
                color: isLike === 1 ? '#d03050' : ''
              }}
            >
              <IIcon icon={like ? 'ic:baseline-star-rate' : 'ic:outline-star-border' } className='mr1' />
              { like === 1 ? '已收藏' : '收藏' }
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
              danger
              type='text'
              size='small'
              icon={<IIcon icon='material-symbols:delete' className='mr1' /> as any}
              onClick={onAddRecycle}
              className='survey-item-bottom'
            >
              删除
            </Button>

          </div>
        </div>
      </Card>
      { contextHolder }
    </>
  )
}
