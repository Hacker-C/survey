import { useRequest } from 'ahooks'
import type { ColumnsType } from 'antd/es/table'
import { Button, Table, Tag } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSurveyList } from '~/api'
import { SearchPanel } from '~/components/SearchPanel'
import type { ListSurvey } from '~/interfaces'
import { LIST_SEARCH_KEY } from '~/constant'
import { formatTime } from '~/utils'

const columns: ColumnsType<ListSurvey> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return <Tag color={status === 0 ? 'orange' : 'blue'}>
        {status === 0 ? '未发布' : '已发布'}
      </Tag>
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (createTime) => {
      return formatTime(createTime)
    }
  },
  {
    title: '截止时间',
    dataIndex: 'expireTime',
    key: 'expireTime',
    render: (expireTime) => {
      return formatTime(expireTime)
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <>
        <Button danger>删除</Button>
      </>
    )
  }
]

export const AdminSurveyList = () => {
  const [searchParams] = useSearchParams()

  const { data, loading, refresh } = useRequest(
    () => getSurveyList({
      pageNum: 1,
      pageSize: 100,
      surveyName: searchParams.get(LIST_SEARCH_KEY) ?? ''
    }),
    {}
  )

  useEffect(refresh, [searchParams])

  return <div p='5 t4'>
    <div flex='' m='b5'>
      <h2 text='xl' font='bold'>问卷管理</h2>
      <div flex='1'></div>
      <SearchPanel tip={'请输入问卷名搜索'} />
    </div>
    <Table
      bordered
      loading={loading}
      columns={columns}
      dataSource={data?.data?.rows}
    />
  </div>
}
