import type { FC, FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { Input } from '../../../components/Input/Input'
import { hasError, validate } from '../../../lib/validate'
import { useCreateTagStore } from '../../../stores/useCreateTagStore'
import { ajax } from '../../../lib/ajax'

interface Props {
  type: 'create' | 'update'
}
export const TagsForm: FC<Props> = ({ type }) => {
  const { data, error, setData, setError } = useCreateTagStore()
  const nav = useNavigate()
  const [URLSearchParam] = useSearchParams()
  const kind = URLSearchParam.get('kind')
  const id = useParams().id

  const { data: tag } = useSWR(
    id ? `/api/v1/tags/${id}` : null,
    async path => (await ajax.get<Resource<Tag>>(path)).data.resource
  )
  useEffect(() => {
    tag && setData(tag)
  }, [tag])

  useEffect(() => {
    if (type === 'update') { return }

    if (!kind) {
      throw new Error('kind必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    setData({ kind })
  }, [])

  const onSubmit: FormEventHandler = async (e) => {
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
      const promise = type === 'create'
        ? ajax.post<Resource<Tag>>('/api/v1/tags', data)
        : ajax.patch<Resource<Tag>>(`/api/v1/tags/${id}`, data)
      const resource = (await promise).data.resource
      setData(resource)
      nav(`/items/new?kind=${kind}`)
    }
  }

  return (
		<form j-form py-16px onSubmit={onSubmit} >
			<Input type="text" label='标签名' placeholder='请输入标签名' value={data.name} error={error.name?.[0]} onChange={name => setData({ name })} />
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
  )
}
