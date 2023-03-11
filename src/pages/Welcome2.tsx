import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome2: FC = () => {
  return (
    <div>
      2
      <Link to={'/welcome/3'}> 下一页 </Link>
    </div>
  )
}
