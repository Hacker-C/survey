import { Button } from 'antd'
import { useSnapshot } from 'valtio'
import { questionStore } from '~/store'

export const QuestionDetailEdit = () => {
  const { curQuestion } = useSnapshot(questionStore)
  return <div>
    { curQuestion?.title }
    <div>
      <Button type='primary'>保存</Button>
    </div>
  </div>
}
