import type { FC } from 'react'
import { useState } from 'react'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TopNav } from '../../components/TopNav'
import { useTopMenuStore } from '../../stores/useTopMenuStore'
import { Icon } from '../../components/Icon'
import type { TimeRange } from '../../components/TimeRangePicker'
import { TimeRangePicker } from '../../components/TimeRangePicker'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'
import { TopMenu } from './components/TopMenu'

export const ItemsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useTopMenuStore()

  return (
		<div flex flex-col h-screen>
			<div j-bg>
				<TopNav title='山竹记账' icon={<Icon name="menu" className='w-24px h-24px' onClick={() => setVisible(true)} />} />
				<TimeRangePicker selected={itemsRange} onChange={selected => setItemsRange(selected)} />
			</div>
			<ItemsSummary />
			<div overflow-scroll >
				<ItemsList />
				<AddItemFloatButton />
			</div>
      <TopMenu isVisible={visible} onMaskClick={() => setVisible(false)} />
		</div>
  )
}
