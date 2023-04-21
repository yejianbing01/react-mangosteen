import type { FC } from 'react'
import { useState } from 'react'
import useSwr from 'swr'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { LineChart } from '../components/charts/LineChart'
import { PieChart } from '../components/charts/PieChart'
import { RankChart } from '../components/charts/RankChart'
import { Select } from '../components/Select'
import { BackIcon } from '../components/BackIcon'
import { ajax } from '../lib/ajax'
import { time } from '../lib/time'

type Groups = { happened_at: string; tag?: string; amount: number }[]

export const StatisticsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<Kind>('expenses')
  const selectItems: { text: string; value: Kind }[] = [
    { text: '支出', value: 'expenses' },
    { text: '收入', value: 'income' },
  ]
  const startTime = time().firstDayOfMonth
  const endTime = time().lastDayOfMonth
  const defaultLineItems: { x: string; y: number }[] = Array.from({ length: startTime.dayCountOfMonth })
    .map((_, index) => ({ x: startTime.clone.add(index, 'day').format(), y: 0 }))

  const { data: items } = useSwr(
    `/api/v1/items/summary?kind=${kind}&group_by=happened_at&happened_before=${startTime.format()}happened_after=${endTime.format()}`,
    async (path: string) => (await ajax.get<{ groups: Groups }>(path, { custom: { showLoading: false } })).data.groups
      .map(({ happened_at, amount }) => ({ x: happened_at, y: amount / 100 }))
  )
  const itemsLineChart = defaultLineItems.map(defaultItem => items?.find(item => item.x === defaultItem.x) || defaultItem)

  const itemsPieChart = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount / 100 }))
  const itemsRankChart = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, sign: item.tag.sign, value: item.amount / 100 }))

  return (
		<div>
			<div j-bg>
				<TopNav title='统计图表' icon={<BackIcon className='w-24px h-24px' />} />
				<TimeRangePicker selected={itemsRange} onChange={selected => setItemsRange(selected)} />
      </div>
      <div h-48px text-16px p-x-16px pt-16px flex items-center gap-x-8px>
        <span>类型</span>
        <div grow-1 h-full>
          <Select name='kind' items={selectItems} value={kind} onChange={kind => setKind(kind)} />
        </div>
      </div>
      <LineChart className='h-120px' items={itemsLineChart} />
      <PieChart className='h-300px my-16px' items={itemsPieChart} />
      <RankChart items={itemsRankChart}/>
		</div>
  )
}
