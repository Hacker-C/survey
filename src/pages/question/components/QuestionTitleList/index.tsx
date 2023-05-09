import { useRequest } from 'ahooks'
import { List, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { listQuestionTitleList } from '~/api'
import { questionStore, surveyStore } from '~/store'
import { SEPERATOR } from '~/constant'
import type { IQuestion } from '~/interfaces'

export const QuestionTitleList = () => {
  const { value } = useSnapshot(questionStore)
  const { curQuestion, updateCurQuestion } = value

  const { data: res } = useRequest(() => listQuestionTitleList(surveyStore.curSurvey?.id as number))
  return <>
    <List
      size='small'
      dataSource={res?.data ?? []}
      renderItem={(item, idx) => {
        const [title] = item.title.split(SEPERATOR)
        return <List.Item className='cursor-pointer' onClick={() => {
          updateCurQuestion(item as IQuestion)
        }}>
          <Typography.Text text={curQuestion?.id === item?.id ? 'primary' : ''}>{idx}. {title}</Typography.Text>
        </List.Item>
      }}
    />
  </>
}
