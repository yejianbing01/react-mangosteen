import type { FC, FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'
import { hasError, validate } from '../lib/validate'
import { useCreateTagStore } from '../stores/useCreateTagStore'

export const TagsNewPage: FC = () => {
  const { data, error, setData, setError } = useCreateTagStore()
  const [URLSearchParam] = useSearchParams()

  useEffect(() => {
    const kind = URLSearchParam.get('kind')
    if (!kind) {
      throw new Error('kind必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    setData({ kind })
  }, [])

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setError(error)
    if (!hasError(error)) {
      // 发送ajax请求
    }
  }

  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<Icon name='back' />} />
			</div>
			<div>
				<form j-form py-16px onSubmit={onSubmit} >
					<Input label='标签名' placeholder='请输入标签名' value={data.name} error={error.name?.[0]} onChange={name => setData({ name })} />
					<Input
						label={
							<div className="flex items-center">
								符号<span className='text-24px h-34px ml-4px'>{data.sign}</span>
							</div>
						}
						error={error.sign?.[0]}
						type="emoji" value={data.sign} onChange={sign => setData({ sign })} />
					<div>
						<p text-center m-y-16px>记账时长按标签，即可进行编辑</p>
						<button j-btn>确认</button>
					</div>
				</form>
			</div>
		</div>
  )
}
