import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome4: FC = () => {
  return (
    <div>
      4
      <Link to={'/welcome/xxx'}> 开始记账 </Link>
    </div>
  )
}
