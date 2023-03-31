import type { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Drawer } from '../../../components/Drawer'
import { Icon } from '../../../components/Icon'

const menuItems = [
  { path: '/chart', text: '统计图表', icon: 'chart' },
  { path: '/export', text: '导出数据', icon: 'export' },
  { path: '/tags', text: '自定义标签', icon: 'category' },
  { path: '/noty', text: '记账提醒', icon: 'noty' },
]

interface Props {
  isVisible: boolean
  onMaskClick?: (e: React.MouseEvent) => void
}
export const TopMenu: FC<Props> = ({ isVisible, onMaskClick }) => {
  return (
    <Drawer placement="left" visible={isVisible} onClose={onMaskClick} >
      <div w-60vw flex flex-col>
        <Link to="/sign_in" flex flex-col grow-0 shrink-0 j-bg px-16px pt-32px pb-42px >
          <h2 text-white text-24px>未登录用户</h2>
          <p text="#CEA1FF">点击这里登录</p>
        </Link>
        <ul p-16px grow-1 shrink-1>
          {menuItems.map(item => (
            <li key={item.path} mb-12px >
              <NavLink to={item.path} flex items-center>
                <Icon name={item.icon} className="w-32px h-32px mr-16px" />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  )
}
