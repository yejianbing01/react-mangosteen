import type { FC } from 'react'
import { Tabs } from './Tabs'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRange
  onChange: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}

export const TimeRangePicker: FC<Props> = (props) => {
  const defaultTimeRanges: { key: TimeRange; text: string }[] = [
    { key: 'thisMonth', text: '本月' },
    { key: 'lastMonth', text: '上月' },
  ]
  const { selected = 'thisMonth', timeRanges = defaultTimeRanges, onChange } = props
  return (
		<Tabs tabItems={timeRanges} value={selected} onChange={onChange} />
  )
}
