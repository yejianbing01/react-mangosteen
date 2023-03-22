import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  className?: string
}
export const CurrentUser: FC<Props> = () => {
  return (
    <Link to="/sign_in" j-bg px-16px pt-32px pb-42px >
      <h2 text-white text-24px>未登录用户</h2>
      <p text="#CEA1FF">点击这里登录</p>
    </Link>
  )
}
