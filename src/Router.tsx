import type { PropsWithChildren } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import {
  HomePage,
  Login,
  Profile,
  Register,
  SurveyList,
  SurveyPage,
  SurveyStar,
  SurveyTrash
} from '~/pages'

// TODO 类型问题
const PrivateRoute = ({ children }: PropsWithChildren<{}>): any => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login" />
}

export const routes: {
  path: string
  isAuth: boolean
  roles?: string[]
}[] = [
  {
    path: '/',
    isAuth: false
  },
  {
    path: '/login',
    isAuth: false
  },
  {
    path: '/register',
    isAuth: false
  },
  {
    path: '/profile',
    isAuth: true,
    roles: ['user', 'admin']
  },
  {
    path: '/survey',
    isAuth: true,
    roles: ['user', 'admin']
  },
  {
    path: '/survey/profile',
    isAuth: true,
    roles: ['user', 'admin']
  },
  {
    path: '/survey/list',
    isAuth: true,
    roles: ['user', 'admin']
  },
  {
    path: '/survey/star',
    isAuth: true,
    roles: ['user', 'admin']
  },
  {
    path: '/survey/trash',
    isAuth: true,
    roles: ['user', 'admin']
  }
]

export const Router = () => {
  return (
    <>
    <BrowserRouter>
          <Routes>

            {/* 公共路由 */}
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            {/* 用户权限路由 */}
            <Route path="/profile" element={<Navigate to={'/survey/profile'}/>} />
            <Route path="/survey" element={<SurveyPage />}>
              <Route path="profile" element={<Profile/>} />
              <Route path="list" element={<SurveyList/>} />
              <Route path="star" element={<SurveyStar/>} />
              <Route path="trash" element={
                <PrivateRoute>
                  <SurveyTrash/>
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}
