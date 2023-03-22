import type { FC } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { CurrentUser } from './CurrentUser'
import { Mask } from './Mask'
import { Menu } from './Menu'

interface Props {
  isVisible?: boolean
  onMaskClick?: (e: React.MouseEvent) => void
}
export const TopMenu: FC<Props> = ({ isVisible, onMaskClick }) => {
  const style = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0%)' : 'translateX(-100%)',
  })

  return (
		<>
			<Mask className='z-[calc(var(--z-menu)-1)]' isVisible={isVisible} onClick={onMaskClick} />
	    <animated.div style={style} z="[var(--z-menu)]" flex flex-col fixed top-0px left-0px h-screen bg-white w-65vw max-w-20em >
	      <CurrentUser className="grow-0 shrink-0" />
	  		<Menu className="grow-1 shrink-1" />
	    </animated.div>
		</>
  )
}
