import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../Icon'

const NavIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`
interface Props {
  className?: string
}

const menuItems = [
  { path: '/chart', text: '统计图表', icon: 'chart' },
  { path: '/export', text: '导出数据', icon: 'export' },
  { path: '/tags', text: '自定义标签', icon: 'category' },
  { path: '/noty', text: '记账提醒', icon: 'noty' },
]

export const Menu: FC<Props> = ({ className }) => {
  return (
    <ul p-16px className={className} >
      {menuItems.map(item => (
        <li key={item.path} mb-12px >
          <NavLink to={item.path} flex items-center>
            <NavIcon name={item.icon}/>{item.text}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
