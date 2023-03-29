import type { FC } from 'react'

export const Tags: FC = () => {
  const tags = Array.from({ length: 99 })

  return (
		<ol grid grid-cols="[repeat(auto-fill,48px)]" justify-center pt-8px px-8px>
			{tags.map(() => <li b-1 b-solid b-red w-48px h-48px flex justify-center items-center >🤡</li>)}
		</ol>
  )
}
