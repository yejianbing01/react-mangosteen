import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { DatePicker } from '../../components/DatePicker'
import { Drawer } from '../../components/Drawer'

interface Props {
  date: string
  setDate?: (value: string) => void
}
export const ItemDate: FC<Props> = (props) => {
  const { date, setDate } = props
  const [datePickVisible, setDatePickVisible] = useState(false)

  return (
		<>
			<Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" onClick={() => setDatePickVisible(true)} />
			<span grow-0 shrink-0 text-12px color="#999" onClick={() => setDatePickVisible(true)}>{date}</span>
      <Drawer placement="bottom" visible={datePickVisible} onClose={() => setDatePickVisible(false)} >
        <DatePicker
          value={new Date(date)}
          onCancel={() => setDatePickVisible(false)}
          onConfirm={(time) => {
            setDate?.(time.format())
            setDatePickVisible(false)
          }}
        />
      </Drawer>
		</>
  )
}
