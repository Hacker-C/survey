import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Progress, Table } from 'antd'
import type { AOption } from '~/api'
import { QuestionType } from '~/constant'

interface StatUIProps {
  stats: AOption[]
  type: QuestionType
}

const columns: ColumnsType<AOption> = [
  {
    title: '选项',
    key: 'content',
    dataIndex: 'content',
    render: content => <div>
      {content}
    </div>
  },
  {
    title: '小计',
    key: 'number',
    dataIndex: 'number',
    width: '100px',
    render: number => <div>
      {number}
    </div>
  },
  {
    title: '比例',
    key: 'percent',
    dataIndex: 'percent',
    width: '200px',
    render: percent => <div flex=''>
      <Progress
        percent={percent}
        strokeLinecap="butt"
        size={[180, 14]}
        showInfo={false}
        strokeColor={'#1e88e5'}
      />
      <span>{percent}%</span>
    </div>
  }
]

export const StatUI: React.FC<StatUIProps> = ({ stats, type }) => {
  if ([QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(type)) {
    stats.sort((a, b) => b.number - a.number)
    return <Table
      bordered
      columns={columns}
      dataSource={stats}
      pagination={{ position: ['none', 'none'] as any }}
      className='mt3 mb6'
    />
  }
  return <Table
    bordered
    dataSource={stats.map((op, idx) => ({ index: idx + 1, content: op.content }))}
    columns={[
      {
        title: '序号',
        key: 'index',
        dataIndex: 'index',
        width: '100px'
      },
      {
        title: '内容',
        key: 'content',
        dataIndex: 'content'
      }
    ]}
    pagination={{ position: ['none', 'none'] as any }}
    className='mt3 mb6'
  />
}
