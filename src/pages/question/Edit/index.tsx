import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'antd'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { SurveyEdit } from '../components/SurveyEdit'
import { QuestionTemplate } from '../components/QuestionTemplate'
import { LogicEdit } from './logic-edit'
import { IIcon } from '~/components/IIcon'
import { QuestionLayout } from '~/layouts'
import { getSurveyList } from '~/api'
import { questionStore } from '~/store'

export function QuestionEdit() {
  const tabList1 = [
    {
      key: 'tab1',
      tab: <span flex='' items='center'>
        <IIcon icon='ic:round-list-alt' />
        <span m='l1'>题型</span>
      </span>
    },
    {
      key: 'tab2',
      tab: <span flex='' items='center'>
      <IIcon icon='ic:sharp-format-list-numbered' />
      <span m='l1'>大纲</span>
    </span>
    }
  ]
  const tabList2 = [
    {
      key: 'tab1',
      tab: <span flex='' items='center'>
        <IIcon icon='material-symbols:edit-document-outline' />
        <span m='l1'>编辑</span>
      </span>
    },
    {
      key: 'tab2',
      tab: <span flex='' items='center'>
      <IIcon icon='uil:setting' />
      <span m='l1'>问卷设置</span>
    </span>
    }
  ]
  const contentList1: Record<string, React.ReactNode> = {
    tab1: <>
      <QuestionTemplate />
    </>,
    tab2: <p>content2</p>
  }
  const contentList2: Record<string, React.ReactNode> = {
    tab1: <p>content1</p>,
    tab2: <SurveyEdit />
  }
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1')
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key)
  }
  const [activeTabKey2, setActiveTabKey2] = useState<string>('tab1')
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key)
  }

  return (
    <>
      <QuestionLayout
        HeaderLeft={<HeaderLeft />}
        HeaderCenter={<HeaderCenter />}
        HeaderRight={<HeaderRight />}
      >
        <div p='5' bg='lightbg' flex=''>
          <div className=''>
            <Card
              tabList={tabList1}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
              className='w70 min-types-h fixed'
            >
               {contentList1[activeTabKey1]}
            </Card>
          </div>
          <div flex='1' className='flex justify-center ml70'>
            <LogicEdit />
          </div>
          <div>
          <Card
              tabList={tabList2}
              activeTabKey={activeTabKey2}
              onTabChange={onTab2Change}
              className='w60 min-types-h'
            >
              {contentList2[activeTabKey2]}
            </Card>
          </div>
        </div>
      </QuestionLayout>
    </>
  )
}

function HeaderLeft() {
  const nav = useNavigate()
  const { id } = useParams()

  const { updateCurSurvey, curSurvey } = useSnapshot(questionStore)

  const { run: runGetSurveyList } = useRequest(() => getSurveyList({
    pageNum: 1,
    pageSize: 200
  }), {
    manual: true,
    onSuccess(res) {
      if (res.code === 200) {
        const survey = res?.data?.rows.find(item => item.id === +id!)
        const { title, description, expireTime } = survey!
        updateCurSurvey({ id: +id!, title, description, expireTime })
      }
    }
  })

  useEffect(() => {
    runGetSurveyList()
  }, [])

  return <div p='x5' flex='' items='center'>
    <span flex='' items='center' text='primary' cursor='pointer'>
      <IIcon icon='material-symbols:arrow-back-ios-new-rounded' />
      <span m='l1' onClick={() => nav(-1)}>返回</span>
    </span>
    <h2 text='base' font='bold' m='l5'>{curSurvey?.title}</h2>
  </div>
}

function HeaderCenter() {
  return <div>
    操作
  </div>
}

function HeaderRight() {
  return (
    <div p='x5'>
      <Button m='r2'>保存</Button>
      <Button type='primary'>发布</Button>
    </div>
  )
}
