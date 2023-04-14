import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'

export const Root: FC = () => {
  const { hasReadWelcomes } = useLocalStore()

  if (hasReadWelcomes) {
    return <Navigate to='/items' />
  } else {
    return <Navigate to='/welcome/1' />
  }
}
