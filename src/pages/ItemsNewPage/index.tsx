import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker'
import { Drawer } from '../../components/Drawer'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'
import { TopNav } from '../../components/TopNav'
import { time } from '../../lib/time'
import { DateAndAmount } from './DateAndAmount'
import { Tags } from './Tags'

type ItemKind = 'expenses' | 'income'

export const ItemsNewPage: FC = () => {
  const [type, setType] = useState<ItemKind>('expenses')
  const [datePickVisible, setDatePickVisible] = useState(false)
  const [date, setDate] = useState(time().format())

  const items: { key: ItemKind; text: string; element: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags/> },
    { key: 'income', text: '收入', element: <Tags/> },
  ]

  return (
    <div flex flex-col h-screen>
			<TopNav title='记一笔' icon={<Icon name='back' />} className="j-bg grow-0 shrink-0" />
      <div grow-1 shrink-1 overflow-hidden>
    		<Tabs tabItems={items} value={type} onChange={value => setType(value)}
    			className="children-grow-1 text-center bg-[#8f4cd7]"
        />
      </div>
      <DateAndAmount className='grow-0 shrink-0' onDateClick={() => setDatePickVisible(true)} date={date} />
      <Drawer placement="bottom" visible={datePickVisible} onClose={() => setDatePickVisible(false)} >
        <DatePicker
          value={new Date(date)}
          onCancel={() => setDatePickVisible(false)}
          onConfirm={(time) => {
            setDate(time.format())
            setDatePickVisible(false)
          }}
        />
      </Drawer>
    </div>
  )
}
