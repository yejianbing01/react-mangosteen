import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

type ItemKind = 'expenses' | 'income'

export const ItemsNewPage: FC = () => {
  const [type, setType] = useState<ItemKind>('expenses')

  const items: { key: ItemKind ; text: string }[] = [
    { key: 'expenses', text: '支出' },
    { key: 'income', text: '收入' },
  ]

  return (
		<div j-bg >
			<TopNav title='记一笔' icon={<Icon name='back' />} />
			<Tabs tabItems={items} value={type} onChange={value => setType(value)}
				className="children-grow-1 text-center"
			/>
		</div>
  )
}
