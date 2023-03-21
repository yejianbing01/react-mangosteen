import type { FC } from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'

const NavIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`

export const TopMenu: FC = () => {
  return (
    <div flex flex-col fixed top-0px left-0px h-screen bg-white w-70vw >
      <div j-bg px-16px pt-32px pb-42px grow-0 shrink-0 >
        <h2 text-white text-24px>未登录用户</h2>
        <p text="#CEA1FF">点击这里登录</p>
      </div>
      <ul p-16px grow-1 shrink-1 children-mb-12px children-flex children-items-center >
        <li><NavIcon name={'chart'}/>统计图表</li>
        <li><NavIcon name={'export'}/>导出数据</li>
        <li><NavIcon name={'category'}/>自定义标签</li>
        <li><NavIcon name={'noty'}/>记账提醒</li>
      </ul>
    </div>
  )
}
