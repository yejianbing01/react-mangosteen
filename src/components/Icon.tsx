import type { FC } from 'react'

export const Icon: FC = () => {
  return (
    <svg style={{ width: '1.2em', height: '1.2em', fill: 'red' }} >
      <use xlinkHref={'#add'}></use>
    </svg>
  )
}
