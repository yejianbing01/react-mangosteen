import type { FC } from 'react'
import { useState } from 'react'
import { time } from '../lib/time'

interface Props {
  start?: Date
  end?: Date
  value?: Date
  itemHeight: number
}
export const DatePicker: FC<Props> = (props) => {
  const { start, end, value, itemHeight = 36 } = props
  const startTime = start ? time(start) : time().add(-10, 'year')
  const endTime = end ? time(end) : time().add(10, 'year')
  const curTime = value ? time(value) : time()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须大于开始时间')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const curIndex = yearList.indexOf(curTime.year)

  const [translateY, _setTranslateY] = useState(curIndex * -itemHeight)
  const [startY, setStartY] = useState(-1)
  // 获得移动范围
  const setTranslateY = (num: number) => {
    const finalY = num > 0
      ? Math.min(num, 0)
      : Math.max(num, (yearList.length - 1) * -itemHeight)
    _setTranslateY(finalY)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const curY = e.touches[0].clientY
    const dy = curY - startY
    setTranslateY(translateY + dy)
    setStartY(curY)
  }
  const onTouchEnd = () => {
    const remainder = Math.abs(translateY) % 36
    if (translateY > 0) {
      remainder < 18
        ? setTranslateY(translateY - remainder)
        : setTranslateY(translateY - remainder + 36)
    } else {
      remainder < 18
        ? setTranslateY(translateY + remainder)
	      : setTranslateY(translateY + remainder - 36)
    }
  }

  return (
		<div relative h-50vh overflow-hidden>
			<div h-36px b-1 b-solid b-red absolute top="50%" translate-y="[-50%]" w-screen />
			<div absolute top="[calc(50%-18px)]" w-screen
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				transition-all duration-100
			>
				<ol text-center children-h-36px children-leading-36px>
					{ yearList.map(year => (<li key={year}>{year}</li>)) }
				</ol>
			</div>
    </div>
  )
}
