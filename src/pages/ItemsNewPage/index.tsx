import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'
import { TopNav } from '../../components/TopNav'
import { useCreateItemStore } from '../../stores/useCreateItemStore'
import { time } from '../../lib/time'
import { DateAndAmount } from './DateAndAmount'
import { Tags } from './Tags'
import { ItemDate } from './ItemDate'

export type ItemKind = 'expenses' | 'income'

export const ItemsNewPage: FC = () => {
  const { data, setData } = useCreateItemStore()
  const [date, setDate] = useState(time().format())

  const items: { key: ItemKind; text: string; element: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} /> },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} /> },
  ]

  return (
    <div flex flex-col h-screen>
			<TopNav title='记一笔' icon={<Icon name='back' />} className="j-bg grow-0 shrink-0" />
      <div grow-1 shrink-1 overflow-hidden>
    		<Tabs tabItems={items} value={data.kind} onChange={value => setData({ kind: value })}
    			className="children-grow-1 text-center bg-[#8f4cd7]"
        />
      </div>
      <DateAndAmount className='grow-0 shrink-0' itemDate={<ItemDate date={date} setDate={setDate} />} />
    </div>
  )
}
