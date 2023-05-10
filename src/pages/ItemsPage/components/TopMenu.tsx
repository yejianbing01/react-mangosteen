import type { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { Drawer } from '../../../components/Drawer'
import { Icon } from '../../../components/Icon'
import { ajax } from '../../../lib/ajax'

const menuItems = [
  { path: '/statistics', text: '统计图表', icon: 'chart' },
  { path: '/export', text: '导出数据', icon: 'export' },
  { path: '/tags', text: '自定义标签', icon: 'category' },
  { path: '/noty', text: '记账提醒', icon: 'noty' },
]

interface Props {
  isVisible: boolean
  onMaskClick?: (e: React.MouseEvent) => void
}
export const TopMenu: FC<Props> = ({ isVisible, onMaskClick }) => {
  const { data } = useSWR(
    '/api/v1/me',
    async path => (await ajax.get<Resource<User>>(path, { custom: { showLoading: false } })).data.resource
  )
  const nav = useNavigate()

  const renderHeader = () => {
    if (data) {
      return (
        <div flex flex-col grow-0 shrink-0 j-bg px-16px pt-32px pb-42px>
          <h2 text-white text-24px overflow-hidden text-ellipsis whitespace-nowrap >{data.name || '无名大侠'}</h2>
          <p text="#CEA1FF">{data.email}</p>
        </div>
      )
    }
    return (
      <Link to="/sign_in" flex flex-col grow-0 shrink-0 j-bg px-16px pt-32px pb-42px >
        <h2 text-white text-24px>未登录用户</h2>
        <p text="#CEA1FF">点击这里登录</p>
      </Link>
    )
  }

  const onLogOut = () => {
    localStorage.removeItem('jwt')
    nav('/sign_in')
  }

  return (
    <Drawer placement="left" visible={isVisible} onClose={onMaskClick} >
      <div w-60vw flex flex-col h-full >
        {renderHeader()}
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
        <div text-center py-24px color="#c0c4cc" onClick={onLogOut} >
          <Icon name='power-off' className='w-24px' />
          <div>退出登录</div>
        </div>
      </div>
    </Drawer>
  )
}
