import type { FC, ReactNode } from 'react'
import { EmojiInput } from './EmojiInput'

interface Props {
  type?: 'text' | 'sms_code' | 'emoji'
  label?: string | ReactNode
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  error?: string
}

export const Input: FC<Props> = (props) => {
  const { type = 'text', label, value, placeholder = '请输入', onChange, error } = props

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
          <button j-btn>发送验证码</button>
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

// <div>
//   <span j-form-label>验证码{error.code?.[0] && <span text-red>{error.code[0]}</span>}</span>
//   <div flex gap-x-16px>
//     <input value={data.code} type="text" placeholder='六位数字' w-128px j-form-input
//       onChange={e => setData({ code: e.target.value })}
//     />
//     <button j-btn>发送验证码</button>
//   </div>
// </div>
