import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Button, Progress, Table } from 'antd'
import PieChart from './charts/PieChart'
import CircleChart from './charts/CircleChart'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import type { AOption } from '~/api'
import { QuestionType } from '~/constant'

interface StatUIProps {
  stats: AOption[]
  type: QuestionType
  title: string
  subtitle: string
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

export const StatUI: React.FC<StatUIProps> = ({ stats, type, title, subtitle }) => {
  const chartData = stats.map(op => ({ name: op.content, value: op.number }))
  const category = stats.map(op => op.content)
  const value = stats.map(op => op.number)

  const [chart, setChart] = React.useState<'pie' | 'circle' | 'bar' | 'line' | 'none'>('pie')

  const ChartComp = () => {
    if (chart === 'pie') {
      return <PieChart data={chartData} title={title} subtitle={subtitle} />
    }
    if (chart === 'circle') {
      return <CircleChart data={chartData} title={title} subtitle={subtitle} />
    }
    if (chart === 'bar') {
      return <BarChart category={category} value={value} title={title} subtitle={subtitle} />
    }
    if (chart === 'line') {
      return <LineChart category={category} value={value} title={title} subtitle={subtitle} />
    }
    return <></>
  }

  if ([QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(type)) {
    stats.sort((a, b) => b.number - a.number)
    return <>
      <Table
        bordered
        columns={columns}
        dataSource={stats}
        pagination={{ position: ['none', 'none'] as any }}
        className='mt3 mb4'
      />
      <div m='b2'>
        <Button
          onClick={() => setChart(chart === 'pie' ? 'none' : 'pie')}
          type={chart === 'pie' ? 'primary' : 'default'}
          m='r2'>
          饼图
        </Button>
        <Button
          onClick={() => setChart(chart === 'circle' ? 'none' : 'circle')}
          type={chart === 'circle' ? 'primary' : 'default'}
          m='r2'>
          环图
        </Button>
        <Button
          onClick={() => setChart(chart === 'bar' ? 'none' : 'bar')}
          type={chart === 'bar' ? 'primary' : 'default'}
          m='r2'
        >
          柱状图
        </Button>
        <Button
          onClick={() => setChart(chart === 'line' ? 'none' : 'line')}
          type={chart === 'line' ? 'primary' : 'default'}
        >
          折线图
        </Button>
      </div>
      {
        ChartComp()
      }
    </>
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
