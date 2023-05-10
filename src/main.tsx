import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { router } from './routes/router'

import './styles/public.scss'
import 'virtual:uno.css'
import './styles/main.scss'
import 'virtual:svgsprites'
import { Loading } from './components/Loading'

vhCheck()

const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)

root.render(
  <React.StrictMode>
		<React.Suspense fallback={<Loading classNames='h-screen' />}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
)
