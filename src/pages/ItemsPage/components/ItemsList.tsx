import axios from 'axios'
import type { FC } from 'react'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import { Loading } from '../../../components/Loading'
import { time } from '../../../lib/time'

const Div = styled.div`
  padding: 16px;
  text-align: center;
`

interface Props {
  start?: string
  end?: string
}
export const ItemsList: FC<Props> = (props) => {
  const { start, end } = props
  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.resources.length < 25) { return null }
      if (!start || !end) { return null }
      return `/api/v1/items?happened_after=${start}&happened_before=${end}&page=${pageIndex + 1}&per_page=25`
    }, async key => (await axios.get<Resources<Item>>(key)).data
  )

  const getItems = (): Item[] => {
    const items: Item [] = []
    data?.forEach(ele => ele.resources.forEach(_ele => items.push(_ele)))
    return items
  }

  const hasMore = data && data[data.length - 1].resources.length === 25

  if (isLoading) { return <Loading /> }

  return (
		<div>
			{getItems().map(item => (
				<div key={item.id} grid grid-rows-2 grid-cols="[auto_1fr_auto]" px-16px py-8px gap-x-12px border-b-1px b-b-solid b="#EEE" >
					<div row-start-1 col-start-1 row-end-3 col-end-2
						w-48px h-48px rounded="50%" bg="#D8D8D8" text-center leading-48px text-24px >{item.tags?.[0].sign}</div>
					<div row-start-1 col-start-2 row-end-2 col-end-3>{item.tags?.[0].name }</div>
					<div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">{ time(item.happen_at).format() }</div>
					<div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">￥{item.amount / 100 }</div>
				</div>
			))}
			{error && <Div>数据加载失败，请刷新页面</Div>}
			{
				!hasMore
				  ? <Div>没有更多了...</Div>
				  : isValidating
				    ? <Div>数据加载中...</Div>
				    : (<Div><button onClick={() => setSize(size + 1)} j-btn>加载更多</button></Div>)
			}
		</div>
  )
}
