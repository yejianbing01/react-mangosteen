import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import styled from 'styled-components'
import { Icon } from '../../components/Icon'
import { ajax } from '../../lib/ajax'
import { LongPressable } from '../../components/LongPressable'

const Div = styled.div`
  padding: 16px;
  text-align: center;
`

interface Props {
  kind: Kind
  value?: Item['tag_ids']
  onChange?: (value: Item['tag_ids']) => void
}
export const Tags: FC<Props> = (props) => {
  const { kind, value, onChange } = props
  const nav = useNavigate()

  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.resources.length < 20) { return null }
      return `/api/v1/tags?page=${pageIndex + 1}&pre_page=20&kind=${kind}`
    }, async key => (await ajax.get<Resources<Tag>>(key, { custom: { showLoading: false } })).data
  )

  const getTags = (): Tag[] => {
    const tags: Tag[] = []
    data?.forEach(ele => ele.resources.forEach(_ele => tags.push(_ele)))
    return tags
  }
  const hasMore = data && data[data.length - 1].resources.length === 10

  // const onPressEnd = nav(`/tags/${}`)

  return (
		<>
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
				{getTags().map((tag, index) =>
					<li key={index} onClick={() => onChange?.([tag.id])}>
						<LongPressable className='flex justify-center items-center flex-col gap-y-8px' onPressEnd={() => nav(`/tags/${tag.id}`)} >
							<span w-48px h-48px rounded='50%' bg="#EFEFEF" text-24px
								flex justify-center items-center b-1px b-solid
								b={value?.includes(tag.id) ? '[var(--primary-color)]' : 'transparent'}>
								{tag.sign}
							</span>
							<span text-14px text={value?.includes(tag.id) ? '[var(--primary-color)]' : '#666'} >{tag.name}</span>
						</LongPressable>
					</li>
				)}
			</ol>
			{error && <Div>数据加载失败，请刷新页面</Div>}
			{
				!hasMore
				  ? <Div>没有更多了...</Div>
				  : isValidating
				    ? <Div>数据加载中...</Div>
				    : (<Div><button onClick={() => setSize(size + 1)} j-btn>加载更多</button></Div>)
			}
		</>
  )
}
