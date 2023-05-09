import type { FC, ReactNode } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { Mask } from './Mask'

type Placement = 'left' | 'right' | 'top' | 'bottom' | 'center'
interface Props {
  visible: boolean
  children: ReactNode
  placement?: Placement
  onClose?: (e: React.MouseEvent) => void
}

const translateMap: Record<Placement, string[]> = {
  left: ['translateX(0%)', 'translateX(-100%)', 'fixed top-0px left-0px h-screen'],
  right: ['translateX(0%)', 'translateX(100%)', 'fixed top-0px right-0px h-screen'],
  top: ['translateY(0%)', 'translateY(-100%)', 'fixed top-0px left-0px w-screen rounded-b-8px'],
  bottom: ['translateY(0%)', 'translateY(100%)', 'fixed bottom-0px left-0px w-screen rounded-t-8px'],
  center: ['', '', 'fixed top-50% left-50% -translate-50% rounded-8px'],
}
export const Drawer: FC<Props> = (props) => {
  const { visible, children, placement = 'left', onClose } = props

  const style = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? translateMap[placement][0] : translateMap[placement][1],
  })

  return (
    <div touch-none fixed top-0 left-0 w-screen h-screen style={{ display: visible ? 'block' : 'none' }} onClick={e => e.stopPropagation()}>
			<Mask isVisible={visible} className={'z-[var(--z-min)]'} onClick={onClose} />
      {
        visible
          ? <animated.div style={style} z="[calc(var(--z-menu)-1)]" bg-white overflow-hidden className={translateMap[placement][2]} >
              {children}
            </animated.div>
          : ''
      }
		</div>
  )
}
