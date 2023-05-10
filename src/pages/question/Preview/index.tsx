import { Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useRequest } from 'ahooks'
import { IIcon } from '~/components/IIcon'
import { QuestionLayout } from '~/layouts'
import { SurveyForm } from '~/components/SurveyForm'
import { getSurveyOverAll } from '~/api'
import './index.css'
import type { GetSurveyForAll } from '~/interfaces'

export const QuestionPreview = () => {
  const [w, setW] = useState(375)

  const { id } = useParams()
  const { data: res } = useRequest(
    () => getSurveyOverAll(+id!)
  )
  const survey = res?.data

  return <QuestionLayout
    HeaderLeft={<HeaderLeft />}
    HeaderCenter={<HeaderCenter updateWidth={setW}/>}
    HeaderRight={<HeaderRight />}
  >
    <div bg='[#f5f5f5]' className='preview-h-container flex justify-center'>
      <div
        className='bg-white fixed preview-h overflow-y-scroll no-scrollbar mt-[10px] preview-box rounded'
        p={ w <= 375 ? '5' : '10' }
        style={{
          width: `${w}px`
        }}
      >
        <div>

        </div>
        <SurveyForm survey={survey as GetSurveyForAll}/>
      </div>
    </div>
  </QuestionLayout>
}

function HeaderLeft() {
  const nav = useNavigate()
  return <div w='50' flex='' m='l5'>
    <div
      flex='center'
      cursor='pointer'
      text='primary'
      onClick={() => {
        nav(-1)
      }}
    >
      <IIcon icon='material-symbols:arrow-back-ios-new-rounded' /> 返回
    </div>
  </div>
}

function HeaderCenter({ updateWidth }: { updateWidth: (w: number) => void }) {
  const nav = useNavigate()
  const [activeTabKey, setActiveTabKey] = useState<'phone' | 'computer'>('phone')
  const baseClass = 'h-16 flex flex-col items-center justify-around cursor-pointer px2'

  return <div flex=''>
    <div
      className={baseClass}
      bg={activeTabKey === 'phone' ? 'thirdary' : 'hover:gray-100'}
      text={activeTabKey === 'phone' ? 'white' : ''}
      onClick={() => {
        setActiveTabKey('phone')
        updateWidth(375)
      }}
    >
      <IIcon icon='ic:round-phone-android' width='27' />
      <span text='xs'>
        手机预览
      </span>
    </div>
    <div
      className={baseClass}
      bg={activeTabKey === 'computer' ? 'thirdary' : 'hover:gray-100'}
      text={activeTabKey === 'computer' ? 'white' : ''}
      onClick={() => {
        setActiveTabKey('computer')
        updateWidth(800)
      }}
    >
      <IIcon icon='ic:round-computer' width='27' />
      <span text='xs'>
        电脑预览
      </span>
    </div>
    <div
      className={baseClass}
      bg='hover:gray-100'
      onClick={() => {
        nav(-1)
      }}
    >
      <IIcon icon='solar:close-circle-linear' width='27' />
      <span text='xs'>
        退出预览
      </span>
    </div>
  </div>
}

function HeaderRight() {
  return <div w='70'>
    <Typography.Text type='danger' className='ml5'>
      提示： 此为预览页面，不能参与作答！
    </Typography.Text>
  </div>
}
