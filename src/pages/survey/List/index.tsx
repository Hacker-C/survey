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

  // 过滤一下 status === 2 的，表示已放入回收站
  const surveys = (data?.data?.rows ?? []).filter(item => item.status !== 2)
  const total = surveys.length

  return (
    <div>
      <SurveyHeader total={total}/>
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id} refresh={refresh}/>
        ))
      }
    </div>
  )
}
