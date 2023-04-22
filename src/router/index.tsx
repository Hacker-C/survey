import { Navigate, createBrowserRouter } from 'react-router-dom'
import { HomeLayout, QuestionLayout } from '~/layouts'
import {
  Home,
  Login,
  NotFound,
  Profile,
  QuestionEdit,
  QuestionStat,
  Register,
  SurveyList,
  SurveyPage,
  SurveyStar,
  SurveyTrash
} from '~/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: 'profile',
    element: <Navigate to={'/survey/profile'}/>
  },
  {
    path: 'survey',
    element: <SurveyPage />,
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
        element: <SurveyTrash />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'stat/:id',
        element: <QuestionStat />
      },
      {
        path: 'edit/:id',
        element: <QuestionEdit />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
