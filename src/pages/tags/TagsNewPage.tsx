import type { FC } from 'react'
import { TopNav } from '../../components/TopNav'
import { BackIcon } from '../../components/BackIcon'
import { TagsForm } from './components/TagsForm'

export const TagsNewPage: FC = () => {
  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<BackIcon />} />
			</div>
      <TagsForm type="create" />
		</div>
  )
}
