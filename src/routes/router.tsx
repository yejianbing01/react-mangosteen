import { Navigate, createHashRouter } from 'react-router-dom'
import React from 'react'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { SignIn } from '../pages/SignIn'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { TagsNewPage } from '../pages/tags/TagsNewPage'
import { TagsEditPage } from '../pages/tags/TagsEditPage'
import { ComingSoonPage } from '../pages/ComingSoonPage'
// import { StatisticsPage } from '../pages/StatisticsPage'
import { ajax } from '../lib/ajax'
import ErrorPage from '../pages/ErrorPage'
import { Root } from '../components/Root'

const StatisticsPage = React.lazy(() => import('../pages/StatisticsPage'))

const itemsPageLoader = async () => {
  const res = await ajax.get<Resources<Item>>('/api/v1/items?page=1')
  if (!res.data.resources.length) { throw new Error('没有数据') }
  return res.data
}

const rootLoader = async () => {
  const res = await ajax.get<Resource<User>>('/api/v1/me')
  return res.data
}

export const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: '/sign_in', element: <SignIn title={'登录'} /> },
  {
    path: '/',
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: '/welcome',
        element: <WelcomeLayout />,
        children: [
          { path: '1', element: <Welcome1 /> },
          { path: '2', element: <Welcome2 /> },
          { path: '3', element: <Welcome3 /> },
          { path: '4', element: <Welcome4 /> },
        ]
      },
      { path: '/home', element: <Home title={'首页'} /> },
      {
        path: '/items',
        element: <ItemsPage />,
        errorElement: <Navigate to={'/home'} replace />,
        loader: itemsPageLoader
      },
      { path: '/items/new', element: <ItemsNewPage /> },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/tags/:id', element: <TagsEditPage /> },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/export', element: <ComingSoonPage /> },
      { path: '/tags', element: <ComingSoonPage /> },
      { path: '/noty', element: <ComingSoonPage /> },
    ]
  }
])
