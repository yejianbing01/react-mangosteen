import type { FC } from 'react'
import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: spin 1s linear infinite;
  }
`
interface Props {
  title?: string
  classNames?: string
}

export const Loading: FC<Props> = ({ title, classNames }) => {
  return (
		<Div className={c('flex flex-col justify-center items-center text-center', classNames)} >
			<Icon name='loading' className='w-68px h-68px mb-10px' />
			<p>{ title || '加载中...'}</p>
		</Div>
  )
}
