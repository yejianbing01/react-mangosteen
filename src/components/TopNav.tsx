import type { FC } from 'react'
import { useTopMenuStore } from '../stores/useTopMenuStore'
import { Icon } from './Icon'

interface Props {
  title: string
}
export const TopNav: FC<Props> = ({ title }) => {
  const { visible, setVisible } = useTopMenuStore()

  return (
		<div flex items-center px-24px py-24px gap-16px >
			<Icon
				name='menu'
				className='color-white w-24px h-24px'
				onClick={() => setVisible(!visible)}
			/>
			<h1 text-white text-24px >{title}</h1>
		</div>
  )
}
