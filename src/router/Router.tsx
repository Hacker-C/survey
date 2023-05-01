import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { useSnapshot } from 'valtio'
import type { RouterConfig } from './routes'
import { routes } from '.'
import { userStore } from '~/store'
import { Fallback } from '~/components/Fallback'

const DomTitle: React.FC<RouterConfig> = (props) => {
  const { meta, element, path } = props
  const title = meta?.title ? `${meta?.title} | 问卷调查管理系统` : '问卷调查管理系统'
  useTitle(title)
  return (
    <Suspense fallback={<Fallback path={path}/>}>
      { element }
    </Suspense>
  )
}

// TODO 类型问题
const PrivateRoute = ({ children, requireRoles }: PropsWithChildren<{ requireRoles: string[] }>): any => {
  const { role } = useSnapshot(userStore)
  if (role === null || ![0, 1].includes(role)) {
    return <Navigate to="/login" />
  }
  const roleName = role === 0 ? 'user' : 'admin'
  if (requireRoles.includes(roleName)) {
    return children
  }
  return <Navigate to="/login" />
}

function RenderRoute(routes: RouterConfig[]) {
  return routes.map((route) => {
    const { path, children, meta } = route
    const element = <DomTitle {...route} />
    if (path === '/login') {
      // const roleStr = localStorage.getItem('role')
      const { role } = useSnapshot(userStore)
      if (role === null) return <Route path={'/login'} element={element} key={'/login'} />
      // const role = +roleStr
      // 自动登录
      if (role === 0) {
        // 普通用户
        return <Route path={path} element={<Navigate to="/survey" />} key={path} />
      }
      if (role === 1) {
        // 管理员
        return <Route path={path} element={<Navigate to="/admin" />} key={path} />
      }
      // 未登录，去登录
      return <Route path={'/login'} element={element} key={'/login'} />
    }
    if (!meta?.isAuth) {
      return <Route path={path} element={element} key={path} />
    }
    if (children?.length) {
      return <>
        <Route path={path} element={<Navigate to={meta.redirect!} key={`/parent${path}`} />} />
        <Route path={path} element={element} key={path}>
          {RenderRoute(children)}
        </Route>
      </>
    }
    return (
      <Route path={path} key={path} element={
        <PrivateRoute requireRoles={meta.requireRoles!}>
          {element}
        </PrivateRoute>
      } />
    )
  })
}

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            RenderRoute(routes)
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}
