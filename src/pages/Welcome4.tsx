import React from 'react'
import type { FC } from 'react'
import cloud from '../assets/images/welcome4.svg'

export const Welcome4: FC = () => {
  return (
    <div>
      <img src={cloud} alt="云" w-130px h-83px />
      <h2 mt-48px text-32px>
        云备份<br/>
        再也不怕数据丢失
      </h2>
    </div>
  )
}
