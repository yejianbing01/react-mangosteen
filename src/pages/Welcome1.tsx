import React from 'react'
import type { FC } from 'react'

import pig from '../assets/images/welcome1.svg'

export const Welcome1: FC = () => {
  return (
    <div>
      <img src={pig} alt="存钱罐" w-128px h-150px />
      <h2 mt-48px text-32px>
        会挣钱<br/>
        还要会省钱
      </h2>
    </div>
  )
}
