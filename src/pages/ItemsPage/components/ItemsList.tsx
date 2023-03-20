import type { FC } from 'react'

interface Props {
  items: Item[]
}

const Item: FC = () => {
  return (
		<div grid grid-rows-2 grid-cols="[auto_1fr_auto]" px-16px py-8px gap-x-12px border-b-1px b-b-solid b="#EEE" >
			<div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px rounded="50%" bg="#D8D8D8" text-center leading-48px >💰</div>
			<div row-start-1 col-start-2 row-end-2 col-end-3>旅行</div>
			<div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">2021年1月1日</div>
			<div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">￥999</div>
		</div>
  )
}

export const ItemsList: FC<Props> = ({ items }) => {
  return (
		<div>
			{items.map(item => <Item key={item.id} />)}
			<div p-16px >
				<button j-btn>加载更多</button>
			</div>
		</div>
  )
}
