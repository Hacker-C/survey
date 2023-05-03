import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { SurveyItem } from '../components/SurveyItem'
import { SurveyHeader } from '~/pages/survey/components/SurveyHeader'
import { getSurveyList } from '~/api'

export function SurveyList() {
  const [params] = useSearchParams()

  const { data, refresh } = useRequest(
    () => getSurveyList({
      pageNum: 1,
      pageSize: 200,
      surveyName: params.get('keyword') ?? ''
    }),
    {}
  )

  useEffect(() => {
    refresh()
  }, [params])

  const surveys = data?.data?.rows ?? []
  const total = data?.data?.total ?? 0

  return (
    <div>
      <SurveyHeader total={total}/>
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id} />
        ))
      }
    </div>
  )
}
