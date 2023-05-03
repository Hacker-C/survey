import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurveyOverAll } from '~/api'

export function QuestionEdit() {
  const { id } = useParams()

  const { data, loading } = useRequest(
    () => getSurveyOverAll(id)
  )

  console.log(data)

  return (
    <>
      <h2>Question Edit</h2>
    </>
  )
}
