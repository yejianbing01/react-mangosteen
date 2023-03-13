import React from 'react'
import type { FC } from 'react'
import clock from '../assets/images/welcome2.svg'

export const Welcome2: FC = () => {
  return (
    <div>
      <img src={clock} alt="闹钟" w-128px h-150px />
      <h2 mt-48px text-32px>
        每日提醒 <br/>
        不会遗漏每一笔账单
      </h2>
    </div>
  )
}
