import type { FC } from 'react'
import useSWR from 'swr'
import { ajax } from '../../../lib/ajax'
import { Money } from '../../../components/Money'
import { Time } from '../../../lib/time'

type Props = {
  start?: string
  end?: string
}
type Balance = {
  balance: number
  expenses: number
  income: number
}
export const ItemsSummary: FC<Props> = (props) => {
  const { start, end } = props
  const { data } = useSWR(
    start && end && `/api/v1/items/balance?happened_after=${start}&happened_before=${new Time(end).add(1, 'day').format()}`,
    async (path: string) => (await ajax.get<Balance>(path, { custom: { showLoading: false } })).data
  )
  return (
		<ol bg="#252A43" flex justify-around items-center m-16px rounded-8px py-12px text-center >
      <li text="#FE7275">
        <div>收入</div>
        <div><Money value={data ? data.income / 100 : 0}/></div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div><Money value={data ? data.expenses / 100 : 0}/></div>
      </li>
      <li text-white>
        <div>净收入</div>
        <div><Money value={data ? data.balance / 100 : 0}/></div>
      </li>
		</ol>
  )
}
