import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome1: FC = () => {
  return (
    <div>
      1
      <Link to={'/welcome/2'}> 下一页 </Link>
    </div>
  )
}
