import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import NotFoundSvg from '~/assets/svgs/404.svg'

export function NotFound() {
  return (
    <div className='flex flex-col items-center mt30'>
      <img src={NotFoundSvg} alt={'NotFoundSvg'} width={'280'} />
      <Typography.Text className='my5'>抱歉, 您访问的页面不存在</Typography.Text>
      <Link to={'/'}>
        <Button type="primary" size={'large'}>回到首页</Button>
      </Link>
    </div>
  )
}
