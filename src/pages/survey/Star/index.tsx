import { SurveyItem } from '../components/SurveyItem'
import { SurveyHeader } from '~/pages/survey/components/SurveyHeader'

// mock data
const surveys = [
  {
    id: 1,
    title: '问卷1',
    description: '问卷1描述',
    status: 1,
    createTime: '2021-01-01',
    expireTime: '2021-01-01'
  },
  {
    id: 3,
    title: '问卷3',
    description: '问卷3描述',
    status: 1,
    createTime: '2021-01-01',
    expireTime: '2021-01-01'
  }
]

export function SurveyStar() {
  return (
    <>
      <SurveyHeader />
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id}/>
        ))
      }
    </>
  )
}
