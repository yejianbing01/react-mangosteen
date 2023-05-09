import type { FC } from 'react'
import { useState } from 'react'
import { Input } from '../../../components/Input/Input'
import type { FormError } from '../../../lib/validate'
import { validate } from '../../../lib/validate'

type Props = {
  onConfirm?: ({ start, end }: { start: string; end: string }) => void
}
export const CustomTimePicker: FC<Props> = (props) => {
  const { onConfirm } = props
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [error, setError] = useState<FormError<{ start: ''; end: '' }>>({ start: [], end: [] })

  const onClick = () => {
    const error = validate({ start, end }, [
      { key: 'start', type: 'required', message: '开始日期不允许为空' },
      { key: 'end', type: 'required', message: '结束日期不允许为空' }
    ])
    if (error) {
      return setError(error)
    }
    onConfirm?.({ start, end })
  }

  return (
		<div onClick={e => e.stopPropagation()} w-70vw h-70vw bg-white text-center p-8px text-16px
			flex flex-col items-center rounded-8px >
			<p font-700 color="[var(--primary-color)]">请选择日期范围</p>
			<Input type='date' value={start} placeholder="开始日期" onChange={value => setStart(value)} error={error.start?.[0]} className='w-full' />
			<Input type='date' value={end} placeholder="结束日期" onChange={value => setEnd(value)} error={error.end?.[0]} className='w-full'/>
			<button h-48px w-full mt-8px bg="[var(--primary-color)]" text-white rounded-24px onClick={onClick} >确认</button>
		</div>
  )
}
