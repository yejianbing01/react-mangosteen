import type { FC } from 'react'
import { Icon } from './Icon'

export const AddItemFloatButton: FC = () => {
  return (
      <button w-48px h-48px rounded="50%" bg="#5f34bf" fixed bottom-16px right-16px text-white flex justify-center items-center >
        <Icon name='add' className='w-42px h-42px' />
      </button>
  )
}
