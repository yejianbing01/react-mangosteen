import type { FC, ReactNode } from 'react'

interface Props {
  title: string
  icon: ReactNode
}
export const TopNav: FC<Props> = ({ title, icon }) => {
  return (
		<div flex items-center px-24px py-24px gap-16px >
			<span color-white w-24px h-24px cursor-pointer flex justify-center items-center children-max-w-24px children-max-h-24px >
				{icon}
			</span>
			<h1 text-white text-24px >{title}</h1>
		</div>
  )
}
