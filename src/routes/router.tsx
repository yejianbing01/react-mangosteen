import { createHashRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import { Root } from '../components/Root'
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

export const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
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
  { path: '/items', element: <ItemsPage /> },
  { path: '/items/new', element: <ItemsNewPage /> },
  { path: '/sign_in', element: <SignIn title={'登录'} /> },
  { path: '/chart', element: <div>统计图表</div> },
  { path: '/export', element: <div>导出数据</div> },
  { path: '/tags', element: <div>自定义标签</div> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/tags/:id', element: <TagsEditPage /> },
  { path: '/noty', element: <div>记账提醒</div> },
])
