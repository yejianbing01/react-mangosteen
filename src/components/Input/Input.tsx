import type { FC, ReactNode } from 'react'
import { SmsCodeInput } from './SmsCodeInput'
import { EmojiInput } from './EmojiInput'
import { DateInput } from './DateInput'

type Props = {
  value?: string
  onChange: (value: string) => void
  label?: string | ReactNode
  placeholder?: string
  error?: string
  className?: string
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'date'; placeholder?: string }
  | { type: 'sms_code'; request: () => Promise<unknown> }
)

export const Input: FC<Props> = (props) => {
  const { type, label, value, placeholder = '请输入', onChange, error, className } = props

  const renderInput = () => {
    if (type === 'text') {
      return <input type="text" j-form-input b="[var(--primary-color)]"
				value={value} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} />
    }

    if (type === 'emoji') {
      return <EmojiInput value={value} onChange={onChange} />
    }

    if (type === 'sms_code') {
      return (
        <SmsCodeInput value={value} onChange={onChange} request={props.request} />
      )
    }

    if (type === 'date') {
      return <DateInput value={value} placeholder={placeholder} onConfirm={onChange} />
    }
  }

  return (
		<div className={className} >
			<div text-18px mb-8px>{label}</div>
			{renderInput()}
			<div text-12px text-red m-t-8px>{error || '　'}</div>
		</div>
  )
}
