import type { FC } from 'react'
import { CurrentUser } from './CurrentUser'
import { Menu } from './Menu'

export const TopMenu: FC = () => {
  return (
    <div flex flex-col fixed top-0px left-0px h-screen bg-white w-65vw max-w-20em >
      <CurrentUser className="grow-0 shrink-0" />
  		<Menu className="grow-1 shrink-1" />
    </div>
  )
}
