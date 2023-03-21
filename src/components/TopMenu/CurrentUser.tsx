import type { FC } from 'react'

interface Props {
  className?: string
}
export const CurrentUser: FC<Props> = () => {
  return (
    <div j-bg px-16px pt-32px pb-42px >
      <h2 text-white text-24px>未登录用户</h2>
      <p text="#CEA1FF">点击这里登录</p>
    </div>
  )
}
