import { useLocation } from 'react-router'
import { Button, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import type { IAnswer } from '~/api'
import { saveAnswer } from '~/api'
import { genComponent, isContainArray } from '~/utils'
import { QuestionType, SEPERATOR } from '~/constant'
import { useMessage } from '~/hooks'
import type { GetSurveyForAll } from '~/interfaces'
import { surveyStore } from '~/store'

interface SurveyFormProps {
  survey: GetSurveyForAll
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ survey }) => {
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
    const answersIds = answers.map(a => a.questionId)
    const requiredQuestionsIds = survey.questions.filter(q => q.type !== QuestionType.TEXT_VIEW
      && q.type !== QuestionType.TITLE_TEXT_VIEW
      && q.type !== QuestionType.TITLE_VIEW
      && q.required !== 0).map(q => q.id)
    if (!isContainArray(answersIds, requiredQuestionsIds)) {
      return warning('请完成所有必答题目')
    }
    saveAnswer({
      answers,
      surveyId: survey.id
    }).then((res) => {
      if (res.code === 200) {
        success('答卷提交成功！', () => {
          surveyStore.makeSubmit(survey.id)
        })
      } else {
        error(res.msg)
      }
    }).catch(() => {
      error('提交失败！')
    })
  }

  let idx = 0

  return <div>
    <Typography.Title level={4} text='center' p='t5'>
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
        if (![QuestionType.TEXT_VIEW, QuestionType.TEXT_VIEW, QuestionType.TITLE_TEXT_VIEW].includes(q.type)) {
          idx++
        }
        return <Component
          onUpdate={q.type === QuestionType.MULTIPLE_CHOICE ? onMultiAnswersUpdate : onSingleAnswersUpdate}
          title={title}
          description={description}
          key={q.id}
          idx={idx}
          required={q.required}
          questionId={q.id}
          options={q.options}
          vertical={true}
          isModel={false}
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
