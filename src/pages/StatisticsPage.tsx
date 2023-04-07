import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'

export const StatisticsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')

  return (
		<div>
			<div j-bg>
				<TopNav title='统计图表' icon={<Icon name="back" className='w-24px h-24px' />} />
				<TimeRangePicker selected={itemsRange} onChange={selected => setItemsRange(selected)} />
			</div>
		</div>
  )
}
