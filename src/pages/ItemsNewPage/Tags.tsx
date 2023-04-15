import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import type { ItemKind } from '.'

interface Props {
  kind: ItemKind
  value?: Item['tag_ids']
  onChange?: (value: Item['tag_ids']) => void
}
export const Tags: FC<Props> = (props) => {
  const { kind, value, onChange } = props
  const tags = Array.from({ length: 43 }).map<Tag>((_, index) => ({
    id: index.toString(),
    sign: '🙃',
    name: `打车${index}`,
    kind: 'expenses',
    user_id: '1',
    created_at: '2000-01-01T00:00:00.000Z',
    updated_at: '2000-01-01T00:00:00.000Z',
    deleted_at: null
  }))

  return (
		<ol grid grid-cols="[repeat(auto-fill,48px)]"
			justify-center pt-8px px-8px gap-x-32px gap-y-16px >
				<Link to={`/tags/new?kind=${kind}`} >
					<li>
						<span w-48px h-48px rounded='50%' bg="#EFEFEF"
							flex justify-center items-center text-24px text="#8F4CD7"
						>
								<Icon name='add' />
						</span>
					</li>
				</Link>
			{tags.map((tag, index) =>
				<li key={index} flex justify-center items-center flex-col gap-y-8px
					onClick={() => onChange?.([tag.id])}>
					<span w-48px h-48px rounded='50%' bg="#EFEFEF" text-24px
						flex justify-center items-center b-1px b-solid
						b={value?.includes(tag.id) ? '[var(--primary-color)]' : 'transparent'}>
						{tag.sign}
					</span>
					<span text-14px text={value?.includes(tag.id) ? '[var(--primary-color)]' : '#666'} >{tag.name}</span>
				</li>
			)}
		</ol>
  )
}
