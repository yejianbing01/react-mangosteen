import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

export const ItemsNewPage: FC = () => {
  const [type, setType] = useState('out')

  const items = [
    { key: 'out', text: '支出' },
    { key: 'in', text: '收入' },
  ]

  return (
		<div j-bg >
			<TopNav title='记一笔' icon={<Icon name='back' />} />
			<Tabs tabItems={items} value={type} onChange={value => setType(value)} />
		</div>
  )
}
