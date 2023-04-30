import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useTitle } from 'ahooks'
import type { RouterConfig } from './routes'
import { routes } from '.'
import { userStore } from '~/store'

const DomTitle: React.FC<RouterConfig> = (props) => {
  const { meta, element } = props
  const title = meta?.title ? `${meta?.title} | 问卷调查管理系统` : '问卷调查管理系统'
  useTitle(title)
  return (
    <Suspense fallback={<h1 text='center'>Loading...</h1>}>
      { element }
    </Suspense>
  )
}

// TODO 类型问题
const PrivateRoute = ({ children, requireRoles }: PropsWithChildren<{ requireRoles: string[] }>): any => {
  if (requireRoles.includes(`${userStore.role}`)) {
    return children
  }

  return <Navigate to="/login" />
}

function RenderRoute(routes: RouterConfig[]) {
  return routes.map((route) => {
    const { path, children, meta } = route
    const element = <DomTitle {...route} />
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
