import type { FC, ReactNode } from 'react'

interface Props {
  title: string
  icon: ReactNode
  className?: string
}
export const TopNav: FC<Props> = ({ title, icon, className }) => {
  return (
		<div flex items-center px-24px py-24px gap-16px className={className} >
			<span color-white w-24px h-24px flex justify-center items-center children-max-w-24px children-max-h-24px >
				{icon}
			</span>
			<h1 text-white text-24px >{title}</h1>
		</div>
  )
}
