import type { FC, ReactNode } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { Mask } from './Mask'

interface Props {
  visible: boolean
  children: ReactNode
  onClose?: (e: React.MouseEvent) => void
}
export const Drawer: FC<Props> = (props) => {
  const { visible, children, onClose } = props
	  const style = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
  })

  return (
		<div>
			<Mask isVisible={visible} className={'z-[var(--z-min)]'} onClick={onClose} />
	    <animated.div style={style} z="[calc(var(--z-menu)-1)]" flex flex-col fixed top-0px left-0px h-screen bg-white w-65vw max-w-20em >
				{children}
	    </animated.div>
		</div>
  )
}
