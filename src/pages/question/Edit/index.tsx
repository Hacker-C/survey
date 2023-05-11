import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'antd'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { SurveyEdit } from '../components/SurveyEdit'
import { QuestionTemplate } from '../components/QuestionTemplate'
import { QuestionDetailEdit } from '../components/QuestionDetailEdit'
import { QuestionTitleList } from '../components/QuestionTitleList'
import { LogicEdit } from './logic-edit'
import { HeaderCenter } from './HeaderCenter'
import { IIcon } from '~/components/IIcon'
import { QuestionLayout } from '~/layouts'
import { getSurveyList, listQuestion } from '~/api'
import { questionStore, surveyStore } from '~/store'

export function QuestionEdit() {
  const { id } = useParams()
  const nav = useNavigate()
  if (!id) {
    nav('/survey/list')
  }
  const { refresh } = useRequest(() => listQuestion({
    pageNum: 1,
    pageSize: 200,
    surveyId: +id!
  }), {
    onSuccess(res) {
      questionStore.value.updateQuestionList(res?.data?.rows ?? [])
    }
  })

  const tabList1 = [
    {
      key: 'tab1',
      tab: <span flex='' items='center'>
        <IIcon icon='bxs:component' />
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
      <QuestionTemplate onLoad={refresh}/>
    </>,
    tab2: <QuestionTitleList />
  }
  const contentList2: Record<string, React.ReactNode> = {
    tab1: <div className='overflow-y-scroll fixed-h-200px'><QuestionDetailEdit /></div>,
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
        <div p='5' bg='lightbg' flex='' className='min-h-65px'>
          <div className=''>
            <Card
              tabList={tabList1}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
              className='w70 fixed-h-105px fixed'
            >
               {contentList1[activeTabKey1]}
            </Card>
          </div>
          <div flex='1' className='flex justify-center ml70 mr80'>
            <LogicEdit />
          </div>
          <div>
          <Card
              tabList={tabList2}
              activeTabKey={activeTabKey2}
              onTabChange={onTab2Change}
              className='w80 fixed-h-105px fixed right-5'
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

  const { updateCurSurvey, curSurvey } = useSnapshot(surveyStore)

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

function HeaderRight() {
  const nav = useNavigate()
  const { id } = useParams()
  return (
    <div p='x5' flex='center'>
      <Button m='r2' flex='center' onClick={() => {
        nav(`/question/preview/${id}`)
      }}>
        <IIcon icon='icon-park-outline:preview-open' className='mr1' />
        预览
      </Button>
      <Button type='primary' flex='center' onClick={() => {
        nav(-1)
      }}>
        <IIcon icon='icons8:finish-flag' className='mr1' />
        完成编辑
      </Button>
    </div>
  )
}
