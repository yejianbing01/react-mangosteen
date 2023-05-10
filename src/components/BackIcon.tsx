import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

type Props = {
  className?: string
  onClick?: () => void
}
export const BackIcon: FC<Props> = (props) => {
  const { className, onClick = () => nav(-1) } = props
  const nav = useNavigate()

  return (
		<Icon className={className} name='back' onClick={onClick} />
  )
}
