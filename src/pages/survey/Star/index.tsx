import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { SurveyItem } from '../components/SurveyItem'
import { SurveyHeader } from '~/pages/survey/components/SurveyHeader'
import { getSurveyListLike } from '~/api'

export function SurveyStar() {
  const [searchParams] = useSearchParams()

  const { data, refresh } = useRequest(
    () => getSurveyListLike({
      pageNum: 1,
      pageSize: 10,
      surveyName: searchParams.get('keyword') || ''
    })
  )

  useEffect(() => {
    refresh()
  }, [searchParams])

  const surveys = data?.data?.rows ?? []
  const total = data?.data?.total ?? 0

  return (
    <>
      <SurveyHeader total={total}/>
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id} refresh={refresh}/>
        ))
      }
    </>
  )
}
