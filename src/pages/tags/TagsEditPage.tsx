import type { FC } from 'react'
import { Icon } from '../../components/Icon'
import { TopNav } from '../../components/TopNav'
import { TagsForm } from './components/TagsForm'

export const TagsEditPage: FC = () => {
  return (
		<div>
			<div j-bg>
				<TopNav title='修改标签' icon={<Icon name='back' />} />
			</div>
      <TagsForm type="update" />
      <div px-16px>
        <div j-btn bg-red >删除</div>
      </div>
		</div>
  )
}
