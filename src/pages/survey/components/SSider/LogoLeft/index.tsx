import { Link } from 'react-router-dom'
import { IIcon } from '~/components/IIcon'

export function LogoLeft({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to='/'>
      <div className='flex items-center justify-center h-20 bg-gray-200 cursor-pointer'>
        <IIcon icon='ri:survey-fill' width='30' className='text-primary'/>
        { !collapsed && <span text='xl primary' font='bold' ml='3'>在线问卷系统</span> }
      </div>
    </Link>

  )
}
