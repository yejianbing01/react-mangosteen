import type { FC, ReactNode } from 'react'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'
import { TopNav } from '../../components/TopNav'
import { useCreateItemStore } from '../../stores/useCreateItemStore'
import { time } from '../../lib/time'
import { hasError, validate } from '../../lib/validate'
import { Toast } from '../../components/Toast'
import { ajax } from '../../lib/ajax'
import { Amount } from './Amount'
import { Tags } from './Tags'
import { ItemDate } from './ItemDate'

export type ItemKind = 'expenses' | 'income'

export const ItemsNewPage: FC = () => {
  const { data, setData } = useCreateItemStore()

  const items: { key: ItemKind; text: string; element: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} /> },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} /> },
  ]

  const onSubmit = () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '类型不允许为空' },
      { key: 'tag_ids', type: 'required', message: '标签不允许为空' },
      { key: 'happen_at', type: 'required', message: '时间不允许为空' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不允许为0' }
    ])
    if (hasError(error)) {
      const info = Object.values(error).flat().map((item, index) => <p key={index}>{item}</p>)
      Toast.info(info, 1000)
    } else {
      ajax.post('/api/v1/items', data)
    }
  }

  return (
    <div flex flex-col h-screen>
			<TopNav title='记一笔' icon={<Icon name='back' />} className="j-bg grow-0 shrink-0" />
      <div grow-1 shrink-1 overflow-hidden>
    		<Tabs tabItems={items} value={data.kind} onChange={value => setData({ kind: value })}
    			className="children-grow-1 text-center bg-[#8f4cd7]"
        />
      </div>
      <Amount className='grow-0 shrink-0'
        value={data.amount ? data.amount / 100 : 0}
        onChange={amount => setData({ amount })}
        onSubmit={onSubmit}
        itemDate={<ItemDate value={time(data.happen_at).date} onChange={happen_at => setData({ happen_at: time(happen_at).format() })}/>}
      />
    </div>
  )
}
