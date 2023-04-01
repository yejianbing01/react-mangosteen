import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

interface ColumnProps {
  value: number
  itemHeight: number
  itemList: number[]
  onChange?: (value: number) => void
}
export const Column: FC<ColumnProps> = (props) => {
  const { value, itemList, itemHeight, onChange } = props

  useEffect(() => {
    const index = itemList.indexOf(value)
    setTranslateY(index * -itemHeight)
  }, [value, itemList.length, itemHeight])

  const curIndex = itemList.indexOf(value)

  const [translateY, _setTranslateY] = useState(curIndex * -itemHeight)
  const [startY, setStartY] = useState(-1)
  // 获得移动范围
  const setTranslateY = (num: number) => {
    const finalY = num > 0
      ? Math.min(num, 0)
      : Math.max(num, (itemList.length - 1) * -itemHeight)
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
    const remainder = Math.abs(translateY) % itemHeight
    const y = remainder < (itemHeight / 2)
      ? translateY + remainder
      : translateY + remainder - itemHeight
    setTranslateY(y)
    onChange?.(itemList[Math.abs(y / itemHeight)])
  }

  return (
		<div relative h-50vh overflow-hidden w-full>
			<div h-36px b-y-2px b-x-0 b-solid b="#eee" absolute top="50%" translate-y="[-50%]" w-full />
			<div absolute top="[calc(50%-18px)]" w-full
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				transition-all duration-100
			>
				<ol text-center children-h-36px children-leading-36px>
					{ itemList.map(item => (<li key={item}>{item}</li>)) }
				</ol>
			</div>
    </div>
  )
}

interface Props {
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
}
export const DatePicker: FC<Props> = (props) => {
  const { start, end, value, itemHeight = 36 } = props

  const [_, update] = useState({})

  const startTime = start ? time(start) : time().add(-10, 'year')
  const endTime = end ? time(end) : time().add(10, 'year')
  const curTime = useRef(value ? time(value) : time())
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须大于开始时间')
  }

  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: curTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)

  return (
		<div flex >
			<Column itemList={yearList} value={curTime.current.year} itemHeight={itemHeight}
				onChange={(year) => {
				  curTime.current.year = year
				  update({})
				}}
			/>
			<Column itemList={monthList} value={curTime.current.month} itemHeight={itemHeight}
				onChange={(month) => {
				  curTime.current.month = month
				  update({})
				}}
			/>
			<Column itemList={dayList} value={curTime.current.day} itemHeight={itemHeight}
				onChange={(day) => { curTime.current.day = day }}
			/>
		</div>
  )
}
