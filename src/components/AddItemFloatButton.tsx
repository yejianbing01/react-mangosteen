import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

export const AddItemFloatButton: FC = () => {
  const nav = useNavigate()
  return (
    <button w-48px h-48px rounded="50%" bg="#5f34bf"
      fixed bottom-16px right-16px text-white flex justify-center items-center
      onClick={() => nav('/items/new')}
    >
        <Icon name='add' className='w-42px h-42px' />
      </button>
  )
}
