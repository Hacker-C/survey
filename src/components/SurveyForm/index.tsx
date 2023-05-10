import { useLocation, useParams } from 'react-router'
import { Button, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import type { IAnswer } from '~/api'
import { saveAnswer } from '~/api'
import { genComponent } from '~/utils'
import { QuestionType, SEPERATOR } from '~/constant'
import { useMessage } from '~/hooks'
import type { GetSurveyForAll } from '~/interfaces'

interface SurveyFormProps {
  survey: GetSurveyForAll
  onSuccess?: () => void
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ survey, onSuccess }) => {
  const { id } = useParams()
  const loc = useLocation()
  const { success, error, warning, contextHolder } = useMessage()

  // TIP 管理单选
  const [singleAnswers, setSingleAnswers] = useState<IAnswer[]>([])
  const onSingleAnswersUpdate = (ans: IAnswer) => {
    setSingleAnswers((preAnswers) => {
      const answers = [...preAnswers]
      const index = answers.findIndex(a => a.questionId === ans.questionId)
      if (index !== -1) {
        // 这个单选答案已存在，直接更新它
        answers.splice(index, 1, ans)
      } else {
        answers.push(ans)
      }
      return answers
    })
  }

  // TIP 管理多选
  const multiAnswersMap = useRef<Map<number, IAnswer[]>>(new Map())
  const onMultiAnswersUpdate = (questionId: number, anss: IAnswer[]) => {
    multiAnswersMap.current.set(questionId, anss)
  }
  const submit = () => {
    const multiAnswers = []
    for (const a of multiAnswersMap.current) {
      multiAnswers.push(...a[1])
    }
    const answers = [...singleAnswers, ...multiAnswers]
    const questionslength = survey.questions.filter(q => q.type !== QuestionType.TEXT_VIEW
      && q.type !== QuestionType.TITLE_TEXT_VIEW
      && q.type !== QuestionType.TITLE_VIEW).length
    const answersLength = [...new Set(answers.map(a => a.questionId))].length
    const isAllFilled = questionslength === answersLength
    if (!isAllFilled) {
      return warning('请完成所有题目')
    }
    saveAnswer({
      answers,
      surveyId: survey.id
    }).then((res) => {
      if (res.code === 200) {
        success('答卷提交成功！', () => {
          onSuccess?.()
        })
      } else {
        error(res.msg)
      }
    }).catch(() => {
      error('提交失败！')
    })
  }

  return <div>
    <Typography.Title level={4} text='center'>
      <span text='primary'>
        {survey?.title}
      </span>
    </Typography.Title>
    <div text='center'>
      <Typography.Text>
        {survey?.description}
      </Typography.Text>
    </div>
    <div>
      {survey?.questions.map((q) => {
        const Component = genComponent(q.type) ?? (<></>) as any
        const [title, description] = q.title.split(SEPERATOR)
        return <Component
          onUpdate={q.type === QuestionType.MULTIPLE_CHOICE ? onMultiAnswersUpdate : onSingleAnswersUpdate}
          title={title}
          description={description}
          key={q.id}
          required={q.required}
          questionId={q.id}
        />
      })}
    </div>
    <div className='flex justify-center mt5'>
      <Button
        type='primary'
        w='30'
        size='large'
        onClick={() => {
          if (loc.pathname.startsWith('/question/preview')) {
            return warning('预览状态下不可提交！')
          }
          submit()
        }}
      >
        提交
      </Button>
    </div>
    { contextHolder }
  </div>
}
