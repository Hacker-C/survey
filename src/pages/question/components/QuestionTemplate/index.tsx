import { Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { AreaInput, LineInput, MultipleChoice, SingleChoice, TextView, TitleText, TitleView } from '../questions'
import { questionStore, surveyStore } from '~/store'
import { QuestionType, SEPERATOR } from '~/constant'
import { saveQuestion } from '~/api'
import { useMessage } from '~/hooks'

interface QuestionTemplateProps {
  onLoad: () => void
}

export const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ onLoad }) => {
  const { addQuestion } = questionStore
  const { curSurvey } = useSnapshot(surveyStore)
  const { error, contextHolder } = useMessage()

  return <div className='overflow-y-scroll min-questions-h'>

    <Typography.Title level={5}>
      <span text='primary'>文本显示类</span>
    </Typography.Title>
    <div className='question-border-hover mb2' onClick={() => {
      saveQuestion({
        type: QuestionType.TITLE_TEXT_VIEW,
        surveyId: curSurvey?.id as number,
        required: 1,
        title: `标题${SEPERATOR}文本`
      }).then((res) => {
        if (res.code === 200) {
          onLoad()
        } else {
          error(res.msg)
        }
      })
    }}>
      <TitleText isModel={true}/>
    </div>
    <div className='question-border-hover mb2' onClick={() => {
      saveQuestion({
        type: QuestionType.TEXT_VIEW,
        surveyId: curSurvey?.id as number,
        required: 1,
        title: '文本描述'
      }).then((res) => {
        if (res.code === 200) {
          onLoad()
        } else {
          error(res.msg)
        }
      })
    }}>
      <TextView isModel={true}/>
    </div>
    <div className='question-border-hover mb2' onClick={() => {
      saveQuestion({
        type: QuestionType.TITLE_VIEW,
        surveyId: curSurvey?.id as number,
        required: 1,
        title: '标题'
      }).then((res) => {
        if (res.code === 200) {
          onLoad()
        } else {
          error(res.msg)
        }
      })
    }}>
      <TitleView isModel={true}/>
    </div>

    <Typography.Title level={5}>
      <span text='primary'>
        用户输入类
      </span>
    </Typography.Title>
    <div className='question-border-hover mb2' onClick={() => {
      saveQuestion({
        type: QuestionType.LINE_INPUT,
        surveyId: curSurvey?.id as number,
        required: 1,
        title: '单行输入标题'
      }).then((res) => {
        if (res.code === 200) {
          onLoad()
        } else {
          error(res.msg)
        }
      })
    }}>
      <LineInput isModel={true}/>
    </div>

    <div className='question-border-hover mb2' onClick={() => {
      saveQuestion({
        type: QuestionType.AREA_INPUT,
        surveyId: curSurvey?.id as number,
        required: 1,
        title: '段落输入标题'
      }).then((res) => {
        if (res.code === 200) {
          onLoad()
        } else {
          error(res.msg)
        }
      })
    }}>
      <AreaInput isModel={true}/>
    </div>

    <Typography.Title level={5}>
      <span text='primary'>
        用户选择类
      </span>
    </Typography.Title>
    <div className='question-border-hover mb2' onClick={() => {
      addQuestion({
        type: QuestionType.SINGLE_CHOICE,
        surveyId: curSurvey?.id as number
      })
    }}>
      <SingleChoice isModel={true} />
    </div>
    <div className='question-border-hover mb2' onClick={() => {
      addQuestion({
        type: QuestionType.MULTIPLE_CHOICE,
        surveyId: curSurvey?.id as number
      })
    }}>
      <MultipleChoice isModel={true} />
    </div>
    { contextHolder }
  </div>
}
