import type { FC } from 'react'
import c from 'classnames'

interface Props {
  className?: string
  onClick?: (e: React.MouseEvent) => void
}
export const Mask: FC<Props> = ({ className, onClick }) => {
  return (
    <div
      fixed top-0 left-0 w-screen h-screen
      className={c(className, 'bg-black:75')}
      onClick={onClick}
    />
  )
}
