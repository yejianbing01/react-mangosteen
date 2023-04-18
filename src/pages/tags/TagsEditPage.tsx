import type { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { TopNav } from '../../components/TopNav'
import { ajax } from '../../lib/ajax'
import { useCreateTagStore } from '../../stores/useCreateTagStore'
import { TagsForm } from './components/TagsForm'

export const TagsEditPage: FC = () => {
  const nav = useNavigate()
  const { setData } = useCreateTagStore()

  const id = useParams().id
  const confirmable = (fn: () => void) => {
    return () => {
      // eslint-disable-next-line no-alert
      const result = window.confirm('确认删除吗')
      if (result) { fn() }
    }
  }

  const onDelete = confirmable(async () => {
    await ajax.delete(`/api/v1/tags/${id}`)
    nav(-1)
    setData({ kind: undefined, name: '', sign: '' })
  })

  return (
		<div>
			<div j-bg>
				<TopNav title='修改标签' icon={<Icon name='back' />} />
			</div>
      <TagsForm type="update" />
      <div px-16px>
        <div j-btn bg-red onClick={onDelete} >删除</div>
      </div>
		</div>
  )
}
