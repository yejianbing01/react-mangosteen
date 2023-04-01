import type { FC, ReactNode } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { Mask } from './Mask'

type Placement = 'left' | 'right' | 'top' | 'bottom'
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
}
export const Drawer: FC<Props> = (props) => {
  const { visible, children, placement = 'left', onClose } = props

  const style = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? translateMap[placement][0] : translateMap[placement][1],
  })

  return (
		<div touch-none>
			<Mask isVisible={visible} className={'z-[var(--z-min)]'} onClick={onClose} />
	    <animated.div style={style} z="[calc(var(--z-menu)-1)]" bg-white className={translateMap[placement][2]} >
        {children}
	    </animated.div>
		</div>
  )
}
