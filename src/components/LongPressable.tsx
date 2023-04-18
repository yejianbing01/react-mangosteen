import type { FC, ReactNode, TouchEvent } from 'react'
import { useRef } from 'react'

interface Props {
  className?: string
  children: ReactNode
  onPressEnd?: () => void
}
export const LongPressable: FC<Props> = (props) => {
  const { className, children, onPressEnd } = props
  const touchTimerRef = useRef<number>()
  const touchPositionRef = useRef<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const onTouchStart = (e: TouchEvent) => {
    touchTimerRef.current = window.setTimeout(() => onPressEnd?.(), 500)
    touchPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchMove = (e: TouchEvent) => {
    const { x, y } = touchPositionRef.current
    if (x === undefined || y === undefined) { return }

    const { clientX, clientY } = e.touches[0]
    const moved = Math.sqrt((clientX - x) ** 2 + (clientY - y) ** 2)
    if (moved > 10) {
      window.clearTimeout(touchTimerRef.current)
      touchTimerRef.current = undefined
      touchPositionRef.current = { x: undefined, y: undefined }
    }
  }
  const onTouchEnd = () => {
    window.clearTimeout(touchTimerRef.current)
    touchTimerRef.current = undefined
    touchPositionRef.current = { x: undefined, y: undefined }
  }

  return (
		<div className={className} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
			{children}
		</div>
  )
}
