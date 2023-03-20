import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TopNav } from '../../components/TopNav'
import type { TimeRange } from './components/TimeRangePicker'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'
import { TimeRangePicker } from './components/TimeRangePicker'

const Div = styled.div`
	background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: FC = () => {
  const [itemsRange, setItemsRange] = useState<TimeRange>('thisMonth')

  return (
		<div>
			<Div>
				<TopNav title='山竹记账' />
				<TimeRangePicker selected={itemsRange} onChange={selected => setItemsRange(selected)} />
			</Div>
			<ItemsSummary />
			<ItemsList />
			<AddItemFloatButton/>
		</div>
  )
}
