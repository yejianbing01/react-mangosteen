import type { FC } from 'react'
import { Navigate } from 'react-router-dom'

export const Root: FC = () => {
  const hasReadWelcome = localStorage.getItem('hasReadWelcome')
  if (hasReadWelcome) {
    return <Navigate to='/home' />
  } else {
    return <Navigate to='/welcome/1' />
  }
}
