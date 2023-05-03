import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { SurveyItem } from '../components/SurveyItem'
import { SurveyHeader } from '~/pages/survey/components/SurveyHeader'
import { getSurveyList } from '~/api'

export function SurveyList() {
  const [params] = useSearchParams()

  const { data } = useRequest(
    () => getSurveyList({
      pageNum: 1,
      pageSize: 200,
      surveyName: params.get('keyword') ?? ''
    }),
    {}
  )

  const surveys = data?.data?.rows ?? []

  return (
    <div>
      <SurveyHeader />
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id} />
        ))
      }
    </div>
  )
}
