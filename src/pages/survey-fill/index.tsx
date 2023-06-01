import { useRequest } from 'ahooks'
import { useParams } from 'react-router'
import { Typography } from 'antd'
import { useSnapshot } from 'valtio'
import { getSurveyByLink } from '~/api'
import { SurveyForm } from '~/components/SurveyForm'
import type { GetSurveyForAll } from '~/interfaces'
import { surveyStore } from '~/store'
import './index.css'

export const SurveyFill = () => {
  const { submitted } = useSnapshot(surveyStore)
  const { id: link } = useParams()
  const { data: res } = useRequest(
    () => getSurveyByLink(link!)
  )
  if (submitted) {
    document.title = '您的答卷已经提交，感谢您的参与！ | 在线问卷系统' as string
    return <>
      <div className='flex justify-center'>
        <Typography.Text text='lg primary' m='t15'>
          您的答卷已经提交，感谢您的参与！
        </Typography.Text>
      </div>
      <Footer />
    </>
  }
  if (res?.code === 201) {
    document.title = '该问卷暂未发布！ | 在线问卷系统' as string
    return <>
      <div className='flex justify-center'>
        <Typography.Text text='lg primary' m='t15'>
          { '该问卷暂未发布！' }
        </Typography.Text>
      </div>
      <Footer />
    </>
  }
  if (res?.code === 200) {
    document.title = `${res.data?.title} | 在线问卷系统` as string
    return <div className='flex justify-center flex-wrap min-h-10px bg-[#eaf2f7] pb10'>
      <div className='sub-bg h20 md:(w-[768px]) w-[500px] lt-xm:(mt10 w-screen)'></div>
      <div
        className='md:(w-[768px]) w-[500px] lt-xm:(mt10 w-screen) fill-box min-w-[320px] bg-white relative min-h-120px'
      >
        <div m='x10 y5'>
          <SurveyForm survey={res?.data as GetSurveyForAll} />
        </div>
        <Footer />
      </div>
    </div>
  }
}

export function Footer() {
  return <footer className='h15 w-100% flex-center bg-gray-100 mt15 absolute bottom-0'>
    <Typography.Link href='/' target='_blank'>
      <span text='base'>
        在线问卷调查系统
      </span>
    </Typography.Link>
    <span text='base' m='l1'>
      提供技术支持
    </span>
  </footer>
}
