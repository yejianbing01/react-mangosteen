import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import VConsole from 'vconsole'
import { router } from './routes/router'

import './styles/public.scss'
import 'virtual:uno.css'
import './styles/main.scss'
import 'virtual:svgsprites'

vhCheck()
new VConsole()

const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)

root.render(
  <React.StrictMode>
    <React.Suspense>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
)
