import type { FC } from 'react'
import { useEffect, useState } from 'react'

interface Props {
  value?: string
  onChange: (value: string) => void
  request: () => Promise<unknown>
  placeholder?: string
}
export const SmsCodeInput: FC<Props> = (props) => {
  const { value, onChange, request, placeholder = '六位数字' } = props
  const [countdown, setCountdown] = useState(false)
  const [second, setSecond] = useState(60)

  const onClick = async () => {
    request()
      .then(() => setCountdown(true))
      .catch(() => {})
  }

  useEffect(() => {
    if (!countdown) { return }
    if (second === 1) {
      setCountdown(false)
      setSecond(60)
      return
    }
    const timer = setTimeout(() => setSecond(second => second - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, second])

  return (
    <div flex gap-x-8px>
     <input value={value} type="text" placeholder={placeholder} w-128px j-form-input
      onChange={e => onChange?.(e.target.value)}/>
			{countdown
			  ? <button type="button" disabled j-btn bg="#ccc">重新获取 {second}s</button>
			  : <button type="button" onClick={onClick} j-btn>发送验证码</button>
			}
    </div>
  )
}
