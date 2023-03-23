import type { FC } from 'react'
import { useState } from 'react'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TopNav } from '../../components/TopNav'
import { TopMenu } from '../../components/TopMenu'
import { useTopMenuStore } from '../../stores/useTopMenuStore'
import { Icon } from '../../components/Icon'
import type { TimeRange } from './components/TimeRangePicker'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'
import { TimeRangePicker } from './components/TimeRangePicker'

export const ItemsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useTopMenuStore()

  return (
		<div>
			<div j-bg>
				<TopNav title='山竹记账' icon={<Icon name="menu" className='w-24px h-24px' onClick={() => setVisible(true)} />} />
				<TimeRangePicker selected={itemsRange} onChange={selected => setItemsRange(selected)} />
			</div>
			<ItemsSummary />
			<ItemsList />
			<AddItemFloatButton />
      <TopMenu isVisible={visible} onMaskClick={() => setVisible(false)} />
		</div>
  )
}
