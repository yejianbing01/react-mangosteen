import type { FC } from 'react'
import { useState } from 'react'
import { Drawer } from '../Drawer'
import { DatePicker } from '../DatePicker'

type Props = {
  value?: string
  placeholder?: string
  onConfirm: (value: string) => void
}
export const DateInput: FC<Props> = (props) => {
  const { value, placeholder, onConfirm } = props

  const [visible, setVisible] = useState(false)
  return (
		<>
			<input type="text" placeholder={placeholder} readOnly h-48px w-full b-0 bg="#00000009"
				rounded-12px text-center font-bold focus:b-1px focus:b-solid focus:b="[var(--primary-color)]"
				onClick={() => setVisible(true)} value={value} />
			<Drawer placement="bottom" visible={visible} onClose={() => setVisible(false)} >
	      <DatePicker
	        value={value ? new Date(value) : new Date()}
	        onCancel={() => setVisible(false)}
	        onConfirm={(time) => {
	          onConfirm(time.format())
	          setVisible(false)
	        }}
	      />
	    </Drawer>
		</>
  )
}
