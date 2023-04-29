import type { PropsWithChildren } from 'react'

interface LoginLayoutProps {
  isLeft?: boolean
  children: React.ReactNode
  sider: React.ReactNode
}

export function LoginLayout(props: LoginLayoutProps) {
  const { isLeft = false, children, sider } = props
  return (
    <div className="h-screen w-screen flex">
      {
        isLeft
          ? (<><Sider>{ sider }</Sider><Content>{ children }</Content></>)
          : (<><Content>{ children }</Content><Sider>{ sider }</Sider></>)
      }
    </div>
  )
}

function Sider({ children }: PropsWithChildren<{}>) {
  return (
    <div className="h-full flex-1">
      { children }
    </div>
  )
}

function Content({ children }: PropsWithChildren<{}>) {
  return (
    <div className="h-full flex-1">
      { children }
    </div>
  )
}
