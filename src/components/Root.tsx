import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocalStore } from '../stores/localStore'

export const Root: FC = () => {
  const { hasReadWelcomes } = useLocalStore()

  if (hasReadWelcomes) {
    return <Navigate to='/home' />
  } else {
    return <Navigate to='/welcome/1' />
  }
}
