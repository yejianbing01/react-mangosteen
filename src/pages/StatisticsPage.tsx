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

type Groups = { happen_at: string; tag?: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]

type getSWRKeyParams = { kind: Kind; start: string; end: string; group_by: 'happen_at' | 'tag_id' }
const getSWRKey = ({ kind, group_by, start, end }: getSWRKeyParams) =>
  `/api/v1/items/summary?kind=${kind}&group_by=${group_by}&happened_before=${start}happened_after=${end}`

const timeRangeMap: { [key in TimeRange]: number } = {
  thisMonth: 0,
  thisYear: 0,
  custom: 0,
  lastMonth: -1,
  twoMonthAgo: -2,
  threeMonthAgo: -3
}

export const StatisticsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<Kind>('expenses')
  const selectItems: { text: string; value: Kind }[] = [
    { text: '支出', value: 'expenses' },
    { text: '收入', value: 'income' },
  ]

  const getTimeRange = (timeRange: TimeRange) => {
    const startTime = time().add(timeRangeMap[timeRange], 'month').firstDayOfMonth
    const endTime = startTime.lastDayOfMonth.add(1, 'day')
    return { startTime, endTime, start: startTime.format(), end: endTime.format() }
  }

  const { startTime, start, end } = getTimeRange(itemsRange)

  const { data: items } = useSwr(
    getSWRKey({ kind, group_by: 'happen_at', start, end }),
    async (path: string) =>
      (await ajax.get<{ groups: Groups }>(path, { custom: { showLoading: false } })).data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )
  const { data: items2 } = useSwr(
    getSWRKey({ kind, group_by: 'tag_id', start, end }),
    async (path: string) =>
      (await ajax.get<{ groups: Groups2 }>(path, { custom: { showLoading: false } })).data.groups
        .map(({ tag: { name, sign }, amount }) => ({ tag: { name, sign }, amount: (amount / 100).toFixed(2) }))
  )

  const defaultLineItems: { x: string; y: number }[] = Array.from({ length: startTime.dayCountOfMonth })
    .map((_, index) => ({ x: startTime.clone.add(index, 'day').format(), y: 0 }))
  const itemsLineChart = defaultLineItems.map(defaultItem => items?.find(item => item.x === defaultItem.x) || defaultItem)
  const itemsPieChart = items2?.map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign })) || []
  const itemsRankChart = items2?.map(item => ({ name: item.tag.name, sign: item.tag.sign, value: item.amount })) || []

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
