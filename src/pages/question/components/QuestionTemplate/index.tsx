import { Typography } from 'antd'
import { TitleView } from '../questions/text-view/title-view'

export const QuestionTemplate = () => {
  return <div className='overflow-y-scroll min-questions-h'>
    <Typography.Title level={5}>文本显示类</Typography.Title>
    {
      Array(10).fill(0).map((_, index) => {
        return <TitleView title='标题' description='描述信息' key={index}/>
      })
    }
  </div>
}
