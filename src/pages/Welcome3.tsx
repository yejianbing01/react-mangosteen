import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome3: FC = () => {
  return (
    <div>
      3
      <Link to={'/welcome/4'}> 下一页 </Link>
    </div>
  )
}
