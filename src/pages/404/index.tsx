import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import NotFoundSvg from '~/assets/svgs/404.svg'

export function NotFound() {
  const nav = useNavigate()
  return (
    <div className='flex flex-col items-center mt30'>
      <img src={NotFoundSvg} alt={'NotFoundSvg'} width={'280'} />
      <Typography.Text className='my5'>抱歉, 您访问的页面不存在</Typography.Text>
      <Button type="primary" size={'large'} onClick={() => nav(-1)}>返回上一页</Button>
    </div>
  )
}
