import { IIcon } from '~/components/IIcon'

export function LogoLeft({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      className='flex items-center h20 justify-center cursor-pointer'
      onClick={() => {
        location.href = '/'
      }}
    >
      <Logo />
      {!collapsed && <span text='xl primary' font='bold deyihei' ml='3'>问卷调查系统</span>}
    </div>
  )
}

export function Logo() {
  return (
    <IIcon icon='ph:codesandbox-logo-bold' width='30' className='text-primary' />
  )
}
