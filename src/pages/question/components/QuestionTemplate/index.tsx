import { Typography } from 'antd'
import { TitleText } from '../questions/text-view/title-text'
import { TextView } from '../questions/text-view/text-view'
import { TitleView } from '../questions/text-view/title-view'
import { LineInput } from '../questions/user-input/line-input'
import { AreaInput } from '../questions/user-input/area-input'
import { SingleChoice } from '../questions/user-choice/single-choice'
import { MultipleChoice } from '../questions/user-choice/multiple-choice'

export const QuestionTemplate = () => {
  return <div className='overflow-y-scroll min-questions-h'>

    <Typography.Title level={5}>文本显示类</Typography.Title>
    <TitleText />
    <TextView />
    <TitleView />

    <Typography.Title level={5}>用户输入类</Typography.Title>
    <LineInput />
    <AreaInput />

    <Typography.Title level={5}>用户选择类</Typography.Title>
    <SingleChoice />
    <MultipleChoice />
  </div>
}
