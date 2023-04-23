import { SurveyItem } from './SurveyItem'
import { SurveyHeader } from './SurveyHeader'

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
    id: 2,
    title: '问卷2',
    description: '问卷2描述',
    status: 0,
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

export function SurveyList() {
  return (
    <div>
    <SurveyHeader />
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id}/>
        ))
      }
    </div>
  )
}
