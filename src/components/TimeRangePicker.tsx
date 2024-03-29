import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { timeRangeToTime } from '../lib/timeRangeToTime'
import type { Time } from '../lib/time'
import { Tabs } from './Tabs'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'twoMonthAgo' | 'threeMonthAgo' | 'thisYear' | 'custom'
interface Props {
  // selected: TimeRange
  onChange: (start?: string, end?: string, startTime?: Time, endTime?: Time) => void
  timeRanges?: { key: TimeRange; text: string | ReactNode }[]
}
const defaultTimeRanges: { key: TimeRange; text: string | ReactNode }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'twoMonthAgo', text: '两个月前' },
  { key: 'threeMonthAgo', text: '三个月前' }
]
export const TimeRangePicker: FC<Props> = (props) => {
  const { timeRanges = defaultTimeRanges, onChange } = props
  const [selected, setSelected] = useState<TimeRange>('thisMonth')
  const { start, end, startTime, endTime } = timeRangeToTime(selected)

  useEffect(() => {
    onChange(start, end, startTime, endTime)
  }, [start, end])

  return (
		<Tabs tabItems={timeRanges} value={selected} onChange={value => setSelected(value)} />
  )
}
