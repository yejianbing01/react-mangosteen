import type { FC } from 'react'
import { Tabs } from './Tabs'

const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRange
  onChange: (selected: TimeRange) => void
}
export const TimeRangePicker: FC<Props> = ({ selected = 'thisMonth', onChange }) => {
  return (
		<Tabs tabItems={timeRanges} value={selected} onChange={onChange} />
  )
}
