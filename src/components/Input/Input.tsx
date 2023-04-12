import type { FC, ReactNode } from 'react'
import { SmsCodeInput } from './SmsCodeInput'
import { EmojiInput } from './EmojiInput'

type Props = {
  value?: string
  onChange: (value: string) => void
  label?: string | ReactNode
  placeholder?: string
  error?: string
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; request: () => Promise<unknown> }
)

export const Input: FC<Props> = (props) => {
  const { type, label, value, placeholder = '请输入', onChange, error } = props

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
  }

  return (
		<div>
			<div text-18px mb-8px>{label}</div>
			{renderInput()}
			<span text-12px text-red m-t-8px>{error || '　'}</span>
		</div>
  )
}
