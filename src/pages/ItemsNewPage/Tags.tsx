import type { FC } from 'react'
import { Icon } from '../../components/Icon'

export const Tags: FC = () => {
  const tags = Array.from({ length: 43 })

  return (
		<ol grid grid-cols="[repeat(auto-fill,48px)]"
			justify-center pt-8px px-8px gap-x-32px gap-y-16px >
			<li>
				<span w-48px h-48px rounded='50%' bg="#EFEFEF"
					flex justify-center items-center text-24px text="#8F4CD7"
				>
					<Icon name='add' />
				</span>
			</li>
			{tags.map((tag, index) =>
				<li key={index} flex justify-center items-center flex-col gap-y-8px>
					<span w-48px h-48px rounded='50%' bg="#EFEFEF" text-24px
						flex justify-center items-center
					>🙃</span>
					<span text-14px text="#666">打车</span>
				</li>
			)}
		</ol>
  )
}
