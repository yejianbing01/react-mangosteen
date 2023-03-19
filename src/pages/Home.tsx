import type { FC } from 'react'
import pig from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'

export const Home: FC = () => {
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
