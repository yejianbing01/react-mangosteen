import type { FC } from 'react'
import { CurrentUser } from './CurrentUser'
import { Mask } from './Mask'
import { Menu } from './Menu'

interface Props {
  onMaskClick?: (e: React.MouseEvent) => void
}
export const TopMenu: FC<Props> = ({ onMaskClick }) => {
  return (
		<>
			<Mask className='z-[calc(var(--z-menu)-1)]' onClick={onMaskClick} />
	    <div z="[var(--z-menu)]" flex flex-col fixed top-0px left-0px h-screen bg-white w-65vw max-w-20em >
	      <CurrentUser className="grow-0 shrink-0" />
	  		<Menu className="grow-1 shrink-1" />
	    </div>
		</>
  )
}
