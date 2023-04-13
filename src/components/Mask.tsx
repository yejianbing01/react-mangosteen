import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import c from 'classnames'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  isVisible?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
  children?: ReactNode
}
export const Mask: FC<Props> = ({ isVisible, className, onClick, children }) => {
  const [maskVisible, setMaskVisible] = useState(isVisible)

  const maskStyle = useSpring({
    opacity: isVisible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.5) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.5) {
        setMaskVisible(false)
      }
    }
  })

  return (
    <animated.div
      fixed top-0 left-0 w-screen h-screen
      className={c(className, 'bg-black:75')}
      onClick={onClick}
      style={{ ...maskStyle, visibility: maskVisible ? 'visible' : 'hidden' }}
    >
      {children}
    </animated.div>
  )
}
