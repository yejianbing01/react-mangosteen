import type { FC } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon'

const NavIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`
interface Props {
  className?: string
}
export const Menu: FC<Props> = ({ className }) => {
  return (
    <ul p-16px children-mb-12px children-flex children-items-center className={className} >
      <li><NavIcon name={'chart'}/>统计图表</li>
      <li><NavIcon name={'export'}/>导出数据</li>
      <li><NavIcon name={'category'}/>自定义标签</li>
      <li><NavIcon name={'noty'}/>记账提醒</li>
    </ul>
  )
}
