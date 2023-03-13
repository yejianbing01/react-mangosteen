import React from 'react'
import type { FC } from 'react'
import chart from '../assets/images/welcome3.svg'

export const Welcome3: FC = () => {
  return (
    <div>
      <img src={chart} alt="图表" w-130px h-108px />
      <h2 mt-48px text-32px>
        数据可视化<br/>
        收支一目了然
      </h2>
    </div>
  )
}
