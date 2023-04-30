import type { PropsWithChildren } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { RouterConfig } from './routes'
import { routes } from './routes'

// TODO 类型问题
const PrivateRoute = ({ children }: PropsWithChildren<{}>): any => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login" />
}

function RenderRoute(routes: RouterConfig[]) {
  return routes.map((route) => {
    const { path, element, isAuth, redirect, children } = route

    if (!isAuth) {
      return <Route path={path} element={element} key={path} />
    }
    if (children?.length) {
      return <>
        <Route path={path} element={<Navigate to={redirect!} key={`/parent${path}`} />} />
        <Route path={path} element={element} key={path}>
          {RenderRoute(children)}
        </Route>
      </>
    }
    return (
      <Route path={path} key={path} element={
        <PrivateRoute>
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
