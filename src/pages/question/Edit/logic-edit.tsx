import { Card, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { questionStore } from '~/store'

export const LogicEdit = () => {
  const { curSurvey } = useSnapshot(questionStore)
  return <Card className='w140'>
    <Typography.Title level={4} text='center'>{ curSurvey?.title }</Typography.Title>
    <Typography.Text>
      <div text='center'>
        { curSurvey?.description }
      </div>
    </Typography.Text>
  </Card>
}
