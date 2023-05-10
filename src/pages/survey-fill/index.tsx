import { useRequest } from 'ahooks'
import { useParams } from 'react-router'
import { Typography } from 'antd'
import { getSurveyByLink } from '~/api'
import { SurveyForm } from '~/components/SurveyForm'
import './index.css'
import type { GetSurveyForAll } from '~/interfaces'

export const SurveyFill = () => {
  const { id: link } = useParams()
  const { data: res, refresh } = useRequest(
    () => getSurveyByLink(link!)
  )
  if (res?.code === 201) {
    document.title = '您的答卷已经提交，感谢您的参与！' as string
    return <>
      <div className='flex justify-center'>
        <Typography.Text text='lg primary' m='t15'>
          { res?.msg?.includes('用户已填写') ? '您的答卷已经提交，感谢您的参与！' : '该问卷暂未发布！' }
        </Typography.Text>
      </div>
      <Footer />
    </>
  }
  if (res?.code === 200) {
    document.title = `${res.data?.title} | 问卷填写` as string
    return <div className='flex justify-center flex-wrap'>
      <div
        className='md:(w-[768px] mt20) w-[500px] mt15 lt-xm:(mt10 w-screen) p5 fill-box min-w-[320px]'
      >
        <SurveyForm survey={res?.data as GetSurveyForAll} onSuccess={refresh}/>
      </div>
      <Footer />
    </div>
  }
}

function Footer() {
  return <footer className='h15 w-100% flex-center bg-gray-100 mt15'>
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
