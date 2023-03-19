import type { FC } from 'react'
import { Icon } from './Icon'

export const AddItemFloatButton: FC = () => {
  return (
      <button w-48px h-48px rounded="50%" bg="#5f34bf" fixed bottom-16px right-16px >
        <Icon />
      </button>
  )
}
