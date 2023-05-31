import { useRequest } from 'ahooks'
import { Button, Card, Tooltip, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { copySurvey, getSurveyList } from '~/api'
import { useMessage } from '~/hooks'

interface CreateModelProps {
  closeModel: () => void
}

export const CreateModel: React.FC<CreateModelProps> = ({ closeModel }) => {
  const { success, error, contextHolder } = useMessage()
  const nav = useNavigate()
  const { data } = useRequest(() => getSurveyList({
    pageNum: 1,
    pageSize: 1000
  }))
  return <div p='x10'>
    <div flex=''>
      <Typography.Title level={4}>问卷模板列表</Typography.Title>
      <Button onClick={closeModel} m='b5 l5'>返回从空白创建问卷</Button>
    </div>
    <div className='flex flex-wrap'>
      {
        (data?.data?.rows ?? []).map((item) => {
          return <Card style={{ width: 250, marginBottom: 15, marginRight: 15 }} key={item.id} title={
            <Tooltip title={item.description}>
              {item.title}
            </Tooltip>
          } hoverable>
            <div>
              <Tooltip title={item.description}>
                <Typography.Paragraph ellipsis={true}>{item.description}</Typography.Paragraph>
              </Tooltip>
            </div>
            <div className='flex justify-center' p='t3'>
              <Link to={`/question/preview/${item.id}`}>
                <Button>预览模板</Button>
              </Link>
              <Button type='primary' m='l3' onClick={() => {
                copySurvey(item.id).then((res) => {
                  if (res.code === 200) {
                    success('复制模板成功', () => {
                      nav(`/question/edit/${res.data}`)
                    })
                  } else {
                    error('复制失败，请联系系统管理员')
                  }
                })
              }}>使用该模板</Button>
            </div>
          </Card>
        })
      }
    </div>
    { contextHolder }
  </div>
}
