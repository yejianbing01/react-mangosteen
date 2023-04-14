import type { FC } from 'react'
import useSWR from 'swr'
import pig from '../assets/images/pig.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: FC<Props> = (props) => {
  useTitle(props.title)

  const { data: meDate, error: meError, isLoading: meLoading } = useSWR(
    '/api/v1/me',
    async path => (await ajax.get<Resource<User>>(path)).data.resource
  )

  const { data: itemsData, error: itemsError, isLoading: itemsLoading } = useSWR(
    meDate && '/api/v1/items',
    async path => (await ajax.get<Resources<Item>>(path)).data
  )

  if (meLoading || itemsLoading) {
    return <Loading classNames='h-screen' />
  }

  if (meError || itemsError) {
    return <div>遇到错误</div>
  }

  if (itemsData?.resources && itemsData?.resources.length > 0) {
    // return <Navigate to={'/items'} />
  }

  return (
    <div text-center>
      <img src={pig} alt="存钱罐" m-y-20vh />
      <div p-x-16px w="100%">
        <button j-btn >开始记账</button>
      </div>
      <AddItemFloatButton />
    </div>
  )
}
