import React from 'react'

// TODO export function Component
function LazyLoadComponent(compName: any) {
  return React.lazy(
    () => import('~/pages').then(module => ({ default: module[compName] }))
  )
}

const HomePage = LazyLoadComponent('HomePage')
const SurveyPage = LazyLoadComponent('SurveyPage')
const AdminPage = LazyLoadComponent('AdminPage')
const UserList = LazyLoadComponent('UserList')
const AdminSurveyList = LazyLoadComponent('AdminSurveyList')
const Login = LazyLoadComponent('Login')
const Register = LazyLoadComponent('Register')
const NotFound = LazyLoadComponent('NotFound')
const Profile = LazyLoadComponent('Profile')
const SurveyCreate = LazyLoadComponent('SurveyCreate')
const SurveyList = LazyLoadComponent('SurveyList')
const SurveyStar = LazyLoadComponent('SurveyStar')
const SurveyTrash = LazyLoadComponent('SurveyTrash')
const QuestionEdit = LazyLoadComponent('QuestionEdit')
const QuestionStat = LazyLoadComponent('QuestionStat')
const QuestionPreview = LazyLoadComponent('QuestionPreview')
const SurveyFill = LazyLoadComponent('SurveyFill')

export interface RouterConfig {
  path: string
  element: React.ReactNode
  children?: RouterConfig[]
  meta?: {
    isAuth?: boolean
    requireRoles?: string[]
    backPath?: string
    redirect?: string
    title?: string
  }
}

export const routes: RouterConfig[] = [
  {
    path: '/',
    element: <HomePage />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    element: <Login/>,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    element: <Register/>,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/survey',
    element: <SurveyPage />,
    meta: {
      isAuth: true,
      redirect: '/survey/profile'
    },
    children: [
      {
        path: 'create',
        element: <SurveyCreate />,
        meta: {
          isAuth: true,
          requireRoles: ['user'],
          title: '新建问卷'
        }
      },
      {
        path: 'profile',
        element: <Profile />,
        meta: {
          isAuth: true,
          requireRoles: ['user'],
          title: '个人中心'
        }
      },
      {
        path: 'list',
        element: <SurveyList />,
        meta: {
          isAuth: true,
          requireRoles: ['user'],
          title: '问卷列表'
        }
      },
      {
        path: 'star',
        element: <SurveyStar />,
        meta: {
          isAuth: true,
          requireRoles: ['user'],
          title: '收藏夹'
        }
      },
      {
        path: 'trash',
        element: <SurveyTrash />,
        meta: {
          isAuth: true,
          requireRoles: ['user'],
          title: '回收站'
        }
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminPage />,
    meta: {
      redirect: '/admin/profile',
      isAuth: true
    },
    children: [
      {
        path: 'profile',
        element: <Profile />,
        meta: {
          isAuth: true,
          requireRoles: ['admin'],
          title: '个人中心'
        }
      },
      {
        path: 'survey',
        element: <AdminSurveyList />,
        meta: {
          isAuth: true,
          requireRoles: ['admin'],
          title: '问卷管理'
        }
      },
      {
        path: 'user',
        element: <UserList />,
        meta: {
          isAuth: true,
          requireRoles: ['admin'],
          title: '用户管理'
        }
      }
    ]
  },
  {
    path: '/question/edit/:id',
    element: <QuestionEdit />,
    meta: {
      isAuth: true,
      requireRoles: ['user'],
      title: '问卷编辑'
    }
  },
  {
    path: '/question/stat/:id',
    element: <QuestionStat />,
    meta: {
      isAuth: true,
      requireRoles: ['user'],
      title: '问卷统计'
    }
  },
  {
    path: '/question/preview/:id',
    element: <QuestionPreview />,
    meta: {
      isAuth: true,
      requireRoles: ['user', 'admin'],
      title: '问卷预览'
    }
  },
  {
    path: '/sv/:id',
    element: <SurveyFill />,
    meta: {
      isAuth: false,
      title: '问卷回答'
    }
  },
  {
    path: '*',
    element: <NotFound />,
    meta: {
      title: '404 Not Found'
    }
  }
]
