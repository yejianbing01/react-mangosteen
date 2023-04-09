import type { FC } from 'react'

interface Props {
  className?: string
  items: { name: string; sign: string; value: number }[]
}
export const RankChart: FC<Props> = (props) => {
  const { className, items } = props
  return (
		<div className={className}>
			{
				items.map((item) => {
				  return (
						<div key={item.name} grid grid-rows="[1fr_1fr]" grid-cols="[48px_1fr_1fr]"
							gap-x-8px gap-y-6px text-12px px-16px my-8px >
							<div row-start-1 col-start-1 row-end-3 col-end-2 h-48px
								rounded="50%" bg="#EFEFEF" flex justify-center items-center text-24px>
								{item.sign}
							</div>
							<div row-start-1 col-start-2 row-end-2 col-end-3>{item.name}</div>
							<div row-start-1 col-start-3 row-end-2 col-end-4 text-right>{item.value}</div>
							<div row-start-2 col-start-2 row-end-3 col-end-4 bg-red h-8px rounded='4px'></div>
						</div>
				  )
				})
			}
		</div>
  )
}
