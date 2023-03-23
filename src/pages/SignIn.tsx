import type { FC } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useTitle } from '../hooks/useTitle'

interface Props {
  title?: string
}
export const SignIn: FC<Props> = ({ title }) => {
  useTitle(title)

  return (
		<div j-bg>
			<TopNav title='登录' icon={<Icon name='back' className='w-24px h-24px' />} />
		</div>
  )
}
