import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { DatePicker } from '../../components/DatePicker'
import { Drawer } from '../../components/Drawer'
import { time } from '../../lib/time'

interface Props {
  value: Date
  onChange: (value: Date) => void
}
export const ItemDate: FC<Props> = (props) => {
  const { value, onChange } = props
  const [datePickVisible, setDatePickVisible] = useState(false)

  return (
		<div bg="#00000009" rounded-4px py-4px px-8px leading-24px flex justify-center items-center gap-x-8px text-16px >
			<Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" onClick={() => setDatePickVisible(true)} />
			<span grow-0 shrink-0 text-12px onClick={() => setDatePickVisible(true)}>{time(value).format()}</span>
      <Drawer placement="bottom" visible={datePickVisible} onClose={() => setDatePickVisible(false)} >
        <DatePicker
          value={new Date(value)}
          onCancel={() => setDatePickVisible(false)}
          onConfirm={(time) => {
            onChange(time.date)
            setDatePickVisible(false)
          }}
        />
      </Drawer>
		</div>
  )
}
