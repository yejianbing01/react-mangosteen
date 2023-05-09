import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TopNav } from '../../components/TopNav'
import { useTopMenuStore } from '../../stores/useTopMenuStore'
import { Icon } from '../../components/Icon'
import type { TimeRange } from '../../components/TimeRangePicker'
import { TimeRangePicker } from '../../components/TimeRangePicker'
import { Toast } from '../../components/Toast'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'
import { TopMenu } from './components/TopMenu'
import { CustomTimePicker } from './components/CustomTimePicker'

export const ItemsPage: FC = () => {
  const { visible, setVisible } = useTopMenuStore()
  const [start, setStart] = useState<string>()
  const [end, setEnd] = useState<string>()

  const timeRanges: { key: TimeRange; text: string | ReactNode }[] = [
    { key: 'thisMonth', text: '本月' },
    { key: 'lastMonth', text: '上月' },
    { key: 'thisYear', text: '今年' },
    {
      key: 'custom',
      text: (<span onClick={() => Toast.custom(<CustomTimePicker onConfirm={({ start, end }) => { onTimeRangeChange(start, end); Toast.hide() }} />)}>
              自定义时间
            </span>)
    }
  ]

  const onTimeRangeChange = (start?: string, end?: string) => {
    setStart(start)
    setEnd(end)
  }

  return (
		<div flex flex-col h-screen>
			<div j-bg>
				<TopNav title='山竹记账' icon={<Icon name="menu" className='w-24px h-24px' onClick={() => setVisible(true)} />} />
        <TimeRangePicker onChange={onTimeRangeChange} timeRanges={timeRanges} />
			</div>
			<ItemsSummary />
			<div overflow-y-auto >
				<ItemsList start={start} end={end} />
				<AddItemFloatButton />
			</div>
			<TopMenu isVisible={visible} onMaskClick={() => setVisible(false)} />
		</div>
  )
}
