import type { FC } from 'react'
import { useState } from 'react'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { LineChart } from '../components/charts/LineChart'
import { PieChart } from '../components/charts/PieChart'
import { RankChart } from '../components/charts/RankChart'
import { Select } from '../components/Select'
import { BackIcon } from '../components/BackIcon'

export const StatisticsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<Kind>('expenses')
  const items = [
    { date: '2000-01-01', value: 15000 },
    { date: '2000-01-02', value: 25000 },
    { date: '2000-01-03', value: 25000 },
    { date: '2000-01-04', value: 35000 },
    { date: '2000-01-05', value: 35000 },
    { date: '2000-01-06', value: 45000 },
    { date: '2000-01-07', value: 45000 },
    { date: '2000-01-08', value: 55000 },
    { date: '2000-01-09', value: 55000 },
    { date: '2000-01-10', value: 65000 },
    { date: '2000-01-11', value: 65000 },
    { date: '2000-01-12', value: 75000 },
    { date: '2000-01-13', value: 75000 },
    { date: '2000-01-14', value: 85000 },
    { date: '2000-01-15', value: 85000 },
    { date: '2000-01-16', value: 95000 },
    { date: '2000-01-17', value: 95000 },
    { date: '2000-01-18', value: 105000 },
    { date: '2000-01-19', value: 105000 },
    { date: '2000-01-20', value: 115000 },
    { date: '2000-01-21', value: 115000 },
    { date: '2000-01-22', value: 125000 },
    { date: '2000-01-23', value: 125000 },
    { date: '2000-01-24', value: 135000 },
    { date: '2000-01-25', value: 135000 },
    { date: '2000-01-26', value: 145000 },
    { date: '2000-01-27', value: 145000 },
    { date: '2000-01-28', value: 155000 },
    { date: '2000-01-29', value: 155000 },
    { date: '2000-01-31', value: 10000 },
  ].map(item => ({ x: item.date, y: item.value / 100 }))
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
  const selectItems: { text: string; value: Kind }[] = [
    { text: '支出', value: 'expenses' },
    { text: '收入', value: 'income' },
  ]

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
      <LineChart className='h-120px' items={items} />
      <PieChart className='h-300px my-16px' items={itemsPieChart} />
      <RankChart items={itemsRankChart}/>
		</div>
  )
}
