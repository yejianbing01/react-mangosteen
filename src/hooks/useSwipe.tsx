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
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const x = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
  }

  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)

    const d = e.touches[0].clientX - x.current
    if (Math.abs(d) < 10) {
      setDirection('')
    } else if (d > 0) {
      setDirection('right')
    } else {
      setDirection('left')
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
