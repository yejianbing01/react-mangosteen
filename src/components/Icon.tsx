import type { FC } from 'react'
import c from 'classnames'

interface Props {
  name: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: FC<Props> = ({ name, className, onClick }) => {
  return (
    <svg className={c(className, 'mangosteen-icon')} onClick={onClick} >
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
