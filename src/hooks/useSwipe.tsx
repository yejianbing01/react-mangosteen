import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

/**
 * 滑动
 * @param elementRef 需要滑动的元素
 * @param config 配置
 * @returns
 */
export const useSwipe = (elementRef: RefObject<HTMLElement>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right' | 'down' | 'up'>('')
  const x = useRef(-1)
  const y = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
    y.current = e.touches[0].clientY
  }

  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)

    const dx = e.touches[0].clientX - x.current
    const dy = e.touches[0].clientY - y.current
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < 10) {
        setDirection('')
      } else if (dx > 0) {
        setDirection('right')
      } else {
        setDirection('left')
      }
    } else {
      if (Math.abs(dy) < 10) {
        setDirection('')
      } else if (dy > 0) {
        setDirection('down')
      } else {
        setDirection('up')
      }
    }
  }

  const ontouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    if (!elementRef.current) {
      return
    }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', ontouchEnd)
    return () => {
      if (!elementRef.current) {
        return
      }
      elementRef.current.removeEventListener('touchstart', onTouchStart)
      elementRef.current.removeEventListener('touchmove', onTouchMove)
      elementRef.current.removeEventListener('touchend', ontouchEnd)
    }
  }, [])

  return direction
}
