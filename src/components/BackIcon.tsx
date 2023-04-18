import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

type Props = {
  className?: string
}
export const BackIcon: FC<Props> = (props) => {
  const { className } = props
  const nav = useNavigate()
  const onClick = () => nav(-1)

  return (
		<Icon className={className} name='back' onClick={onClick} />
  )
}
