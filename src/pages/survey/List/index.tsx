import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { SurveyItem } from '../components/SurveyItem'
import { SurveyHeader } from '~/pages/survey/components/SurveyHeader'
import { getSurveyList } from '~/api'
import type { ListSurveyForm } from '~/interfaces'

export function SurveyList() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<number>()
  const [sort, setSort] = useState<number>()

  const { data, refresh } = useRequest(
    () => {
      let params: ListSurveyForm = {
        pageNum: 1,
        pageSize: 200,
        surveyName: searchParams.get('keyword') ?? ''
      }
      if (status === 0 || status === 1) {
        params = { ...params, status }
      }
      return getSurveyList(params)
    }
  )

  useEffect(() => {
    refresh()
  }, [searchParams, status])

  // 过滤一下 status === 2 的，表示已放入回收站
  const surveys = (data?.data?.rows ?? []).filter(item => item.status !== 2)
  const total = surveys.length
  // 排序
  if (sort === 1) {
    surveys.sort((a, b) => dayjs(a.createTime).isBefore(b.createTime) ? -1 : 1)
  } else if (sort === 2) {
    surveys.sort((a, b) => dayjs(a.createTime).isBefore(b.createTime) ? 1 : -1)
  } else if (sort === 3) {
    surveys.sort((a, b) => dayjs(a.expireTime).isBefore(b.expireTime) ? -1 : 1)
  } else if (sort === 4) {
    surveys.sort((a, b) => dayjs(a.expireTime).isBefore(b.expireTime) ? 1 : -1)
  }

  return (
    <div>
      <SurveyHeader total={total} toggleStatus={setStatus} toggleSort={setSort}/>
      {
        surveys.map(survey => (
          <SurveyItem survey={survey} key={survey.id} refresh={refresh}/>
        ))
      }
    </div>
  )
}
