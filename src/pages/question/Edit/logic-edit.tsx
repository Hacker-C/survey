import { Card, Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { SEPERATOR } from '~/constant'
import { questionStore, surveyStore } from '~/store'
import { genComponent } from '~/utils'

export const LogicEdit = () => {
  const { curSurvey } = useSnapshot(surveyStore)
  const { value } = useSnapshot(questionStore)
  const { questionList, updateCurQuestion, curQuestion } = value

  return <Card className='w140'>
    <Typography.Title level={4} text='center'>{curSurvey?.title}</Typography.Title>
    <Typography.Text>
      <div text='center'>
        {curSurvey?.description}
      </div>
    </Typography.Text>
    <div>
      {questionList.map((q) => {
        const Component = genComponent(q.type) ?? (<></>) as any
        const [title, description] = q.title.split(SEPERATOR)
        return <div
          key={q.id}
          onClick={() => {
            updateCurQuestion(q)
          }}
          className='border-2 border-solid border-transparent question-border-hover my2'
          style={{ borderColor: curQuestion?.id === q.id ? '#1677ff' : '' }}
        >
          <Component
            title={title}
            description={description}
            key={q.id}
            required={q.required}
            questionId={q.id}
          />
        </div>
      })}
    </div>
  </Card>
}
