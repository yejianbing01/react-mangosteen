import type { FC } from 'react'
import { Money } from '../Money'

const colors = ['#5470c6', '#ffbab0', '#ffa750', '#8748d3', '#53a867', '#eba953', '#91cc75', '#fac858', '#ee6666', '#73c0de']

interface Props {
  className?: string
  items: { name: string; sign: string; value: number }[]
}
export const RankChart: FC<Props> = (props) => {
  const { className, items } = props

  const total = items.reduce((result, item) => result + item.value, 0) ?? 0
  const max = items.reduce((prev, item) => Math.max(prev, item.value), 0) ?? 0
  return (
		<div className={className}>
			{
				items.map((item, index) => {
				  return (
						<div key={item.name} grid grid-rows="[1fr_1fr]" grid-cols="[48px_1fr_1fr]"
							gap-x-8px gap-y-6px text-12px px-16px my-8px >
							<div row-start-1 col-start-1 row-end-3 col-end-2 h-48px
								rounded="50%" bg="#EFEFEF" flex justify-center items-center text-24px>
								{item.sign}
							</div>
							<div row-start-1 col-start-2 row-end-2 col-end-3>{item.name} - {`${(item.value / total * 100).toFixed(0)}%` }</div>
							<div row-start-1 col-start-3 row-end-2 col-end-4 text-right>
								<Money value={item.value} />
							</div>
							<div row-start-2 col-start-2 row-end-3 col-end-4 bg="#ccc" h-8px rounded='4px' overflow-hidden>
								<div h-full rounded='4px' style={{ background: colors[index], width: `${item.value / max * 100}%` }} />
							</div>
						</div>
				  )
				})
			}
		</div>
  )
}
