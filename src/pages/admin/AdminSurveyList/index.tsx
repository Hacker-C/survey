import { useRequest } from 'ahooks'
import type { ColumnsType } from 'antd/es/table'
import { Button, Table, Tooltip, Typography } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLinkBySurveyId, getSurveyList } from '~/api'
import { SearchPanel } from '~/components/SearchPanel'
import type { ListSurvey } from '~/interfaces'
import { LIST_SEARCH_KEY } from '~/constant'
import { formatTime, surveyStatusComp } from '~/utils'
import { IIcon } from '~/components/IIcon'

const { Paragraph } = Typography

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
      return surveyStatusComp(status)
    }
  },
  {
    title: '链接',
    dataIndex: 'link',
    key: 'link',
    render: (link, record) => {
      const fullLink = `http://localhost:3333/sv/${link}`
      return record.status === 1
        ? <div className='flex'>
          <Paragraph
            copyable={{
              text: fullLink,
              tooltips: ['复制链接', '复制成功']
            }}
            style={{
              whiteSpace: 'nowrap'
            }}
          >
            <span>{link}</span>
          </Paragraph>
          <Tooltip title="打开链接">
            <a href={fullLink} target='_blank'>
              <IIcon icon='ph:link' width='20' className='text-primary cursor-pointer' />
            </a>
          </Tooltip>
        </div>
        : '暂无链接'
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
      <Link to={`/question/preview/${record.id}`}>
        <Button type='primary' className='flex-center'>
          <IIcon icon='icon-park-outline:preview-open' />
          <span m='l1'>预览</span>
        </Button>
      </Link>
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

  const [surveys, setSurveys] = useState<ListSurvey[]>([])
  useEffect(() => {
    setSurveys(data?.data?.rows as ListSurvey[])
    data?.data?.rows?.forEach(async (item) => {
      const link = (await getLinkBySurveyId(item.id)).data
      setSurveys((surveys) => {
        return surveys?.map((survey) => {
          if (survey.id === item.id) {
            return {
              ...survey,
              link
            }
          }
          return survey
        })
      })
    })
  }, [data])

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
      dataSource={surveys}
    />
  </div>
}
