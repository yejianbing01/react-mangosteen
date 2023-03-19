import type { FC } from 'react'
import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import pig from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'

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
    return <div>loading...</div>
  }

  if (meError || itemsError) {
    return <div>遇到错误</div>
  }

  if (itemsData?.resources && itemsData?.resources.length > 0) {
    return <Navigate to={'/items'} />
  }

  return (
    <div text-center>
      <img src={pig} alt="存钱罐" m-y-20vh />
      <div p-x-16px w="100%">
        <button w="100%" bg="#5f34bf" h-48px rounded-8px text-white >开始记账</button>
      </div>
      <button w-48px h-48px rounded="50%" bg="#5f34bf" fixed bottom-16px right-16px >
        <img src={add} alt="加号" max-h="100%" max-w="100%" v-top />
      </button>
    </div>
  )
}
