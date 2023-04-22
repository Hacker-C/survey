import { Navigate, createBrowserRouter } from 'react-router-dom'
import { QuestionLayout } from '~/layouts'
import {
  HomePage,
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
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <HomePage />
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
