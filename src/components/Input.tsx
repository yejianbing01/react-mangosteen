import type { FC, ReactNode } from 'react'
import { EmojiInput } from './EmojiInput'

type Props = {
  label?: string | ReactNode
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  error?: string
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; onClick: () => void }
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
        <div flex gap-x-8px>
         <input value={value} type="text" placeholder='六位数字' w-128px j-form-input
          onChange={e => onChange?.(e.target.value)}/>
          <button type="button" onClick={props.onClick} j-btn>发送验证码</button>
        </div>
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
