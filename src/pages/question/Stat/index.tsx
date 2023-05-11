import { useNavigate, useParams } from 'react-router'
import { useRequest } from 'ahooks'
import { Descriptions, Typography } from 'antd'
import { StatUI } from './stat-ui'
import { IIcon } from '~/components/IIcon'
import { QuestionLayout } from '~/layouts'
import type { AQuestion } from '~/api'
import { analysisAnswer } from '~/api'
import { filterQuestions, formatTime } from '~/utils'

export function QuestionStat() {
  const { id } = useParams()
  const { data: res } = useRequest(() => analysisAnswer(+id!))

  const questions = filterQuestions(res?.data?.questions ?? []) as AQuestion[]

  return <QuestionLayout
    HeaderLeft={<HeaderLeft />}
    HeaderCenter={<HeaderCenter title={res?.data?.title as string} />}
    HeaderRight={<HeaderRight />}
  >
    <div bg='#f7f7f7' className='min-h-70px flex justify-center pb10'>
      <div className='shadow-box bg-white w-[900px] mt10 rounded px10 py5'>
        <Descriptions
          title={<Typography.Title level={5}>问卷基本信息</Typography.Title>}
          layout="vertical"
        >
          <Descriptions.Item label="问卷标题">{res?.data?.title}</Descriptions.Item>
          <Descriptions.Item label="问卷描述">{res?.data?.description}</Descriptions.Item>
          <Descriptions.Item label="问卷作者">{res?.data?.nickname}</Descriptions.Item>
          <Descriptions.Item label="截止时间">{formatTime(res?.data?.expireTime)}</Descriptions.Item>
          <Descriptions.Item label="问题总数">{questions.length}</Descriptions.Item>
          <Descriptions.Item label="答卷总数">{res?.data?.total}</Descriptions.Item>
        </Descriptions>

        <div m='t5 b5'>
          <Typography.Title level={5}>统计结果</Typography.Title>
        </div>
        <div>
          { questions.map((q, idx) => {
            return <div key={q.title}>
              <Typography.Text text='base'>
                第 {idx + 1} 题：{ q.title }
              </Typography.Text>
              <StatUI stats={q.options} type={q.type}/>
            </div>
          }) }
        </div>
      </div>
    </div>
  </QuestionLayout>
}

function HeaderLeft() {
  const nav = useNavigate()
  return <span onClick={() => nav(-1)} flex='' items='center' text='primary' cursor='pointer' m='l5'>
    <IIcon icon='material-symbols:arrow-back-ios-new-rounded' />
    <span m='l1'>返回</span>
  </span>
}

function HeaderCenter({ title }: { title: string }) {
  return <div>
    <h1 text='xl primary' font='bold'>
      {title}
    </h1>
  </div>
}

function HeaderRight() {
  return <div>
  </div>
}
