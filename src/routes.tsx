import React from 'react'
import {
  AdminPage,
  HomePage,
  Login,
  NotFound,
  Profile,
  Register,
  SurveyList,
  SurveyPage,
  SurveyStar,
  SurveyTrash
} from '~/pages'

export interface RouterConfig {
  path: string
  element: React.ReactNode
  isAuth?: boolean
  requireRoles?: string[]
  backPath?: string
  redirect?: string
  children?: RouterConfig[]
}

export const routes: RouterConfig[] = [
  {
    path: '/',
    element: <HomePage />,
    isAuth: false
  },
  {
    path: '/login',
    element: <Login/>,
    isAuth: false
  },
  {
    path: '/register',
    element: <Register/>,
    isAuth: false
  },
  {
    path: '/survey',
    redirect: '/survey/profile',
    element: <SurveyPage />,
    isAuth: true,
    children: [
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'list',
        element: <SurveyList />
      },
      {
        path: 'star',
        element: <SurveyStar />
      },
      {
        path: 'trash',
        element: <SurveyTrash />,
        isAuth: true
      }
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/profile',
    element: <AdminPage />,
    isAuth: true,
    children: [
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'survey',
        element: <div>survey list</div>
      },
      {
        path: 'user',
        element: <div>user list</div>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]
