import type { FC } from 'react'
import c from 'classnames'

interface Props {
  name: string
  className?: string
}

export const Icon: FC<Props> = ({ name, className }) => {
  return (
    <svg className={c(className, 'mangosteen-icon')} >
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
