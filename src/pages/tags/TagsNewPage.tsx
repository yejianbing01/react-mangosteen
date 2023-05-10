import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../../components/TopNav'
import { BackIcon } from '../../components/BackIcon'
import { TagsForm } from './components/TagsForm'

export const TagsNewPage: FC = () => {
  const nav = useNavigate()

  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<BackIcon onClick={() => nav('/items')} />} />
			</div>
      <TagsForm type="create" />
		</div>
  )
}
