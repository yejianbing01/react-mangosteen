import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
