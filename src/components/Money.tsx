import type { FC } from 'react'

interface Props {
  value?: number
}
export const Money: FC<Props> = (props) => {
  return (
		<span>{`￥${props.value}元`}</span>
  )
}
