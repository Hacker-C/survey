import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cancelRecycle, getRecycleList, deleteSurvey } from '~/api'
import { SearchPanel } from '~/components/SearchPanel'
import type { ListSurvey } from '~/interfaces'
import { addKeyOfData, formatTime } from '~/utils'
import { useMessage } from '~/hooks'
import { IIcon } from '~/components/IIcon'

export function SurveyTrash() {
  const [params] = useSearchParams()
  const { success, error, contextHolder } = useMessage()

  const { data, refresh } = useRequest(
    () => getRecycleList({
      pageNum: 1,
      pageSize: 200,
      surveyName: params.get('keyword') ?? ''
    })
  )

  const surveys = data?.data?.rows ?? []

  const dataSource = addKeyOfData(surveys)

  const columns: ColumnsType<ListSurvey> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '问卷标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: text => formatTime(text)
    },
    {
      title: '截止时间',
      dataIndex: 'expireTime',
      key: 'expireTime',
      render: text => formatTime(text)
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount',
      key: 'answerCount',
      render: () => 10
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="确定恢复该问卷吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              cancelRecycle(record.id).then((res) => {
                if (res.code === 200) {
                  success('已恢复', () => {
                    refresh()
                  })
                } else {
                  error(res.msg)
                }
              }).catch(() => {
                error('请求失败')
              })
            }}
          >
            <Button type='primary'>恢复</Button>
          </Popconfirm>
          <Popconfirm
            title="彻底删除该问卷？"
            description="删除后将无法恢复！"
            okText="确定"
            cancelText="取消"
            icon={ <IIcon icon="gg:danger" style={{ color: 'red' }} /> }
            onConfirm={() => {
              deleteSurvey(record.id).then((res) => {
                if (res.code === 200) {
                  success('已彻底删除', () => {
                    refresh()
                  })
                } else {
                  error(res.msg)
                }
              }).catch(() => {
                error('请求失败')
              })
            }}
          >
          <Button danger type='primary'>彻底删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  useEffect(refresh, [params])

  return (
    <>
      <div className='flex items-center mb5'>
        <Typography.Title level={4} className='theme-duration dark:(text-darktext)'>问卷列表</Typography.Title>
        <div flex='1'></div>
        <SearchPanel />
      </div>
      <Table columns={columns} dataSource={dataSource} />
      {contextHolder}
    </>
  )
}
