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

  // 过滤一下 status === 2 的，表示已放入回收站
  const surveys = (data?.data?.rows ?? []).filter(item => item.status !== 2)
  const total = surveys.length

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
