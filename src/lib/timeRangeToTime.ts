import type { TimeRange } from '../components/TimeRangePicker'
import { time } from './time'

const timeRangeMap: { [key in TimeRange]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthAgo: -2,
  threeMonthAgo: -3
}

export const timeRangeToTime = (timeRange: TimeRange) => {
  let startTime, endTime
  switch (timeRange) {
    case 'thisMonth':
    case 'lastMonth':
    case 'twoMonthAgo':
    case 'threeMonthAgo':
      startTime = time().add(timeRangeMap[timeRange], 'month').firstDayOfMonth
      endTime = startTime.lastDayOfMonth.add(1, 'day')
      break
    case 'thisYear':
      startTime = time().setParts({ month: 1 }).firstDayOfMonth
      endTime = time().add(1, 'year').setParts({ month: 1 }).firstDayOfMonth
      break
    case 'custom':
      break
    default:
      startTime = time()
      endTime = time()
      break
  }

  return { startTime, endTime, start: startTime?.format(), end: endTime?.format() }
}
