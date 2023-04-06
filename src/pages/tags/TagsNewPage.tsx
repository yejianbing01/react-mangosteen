import type { FC } from 'react'
import { Icon } from '../../components/Icon'
import { TopNav } from '../../components/TopNav'
import { TagsForm } from './components/TagsForm'

export const TagsNewPage: FC = () => {
  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<Icon name='back' />} />
			</div>
      <TagsForm type="create" />
		</div>
  )
}
