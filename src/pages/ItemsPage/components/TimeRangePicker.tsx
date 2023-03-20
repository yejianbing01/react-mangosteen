import type { FC } from 'react'
import styles from './TimeRangePicker.module.scss'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRange
  onChange: (selected: TimeRange) => void
}

const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]

export const TimeRangePicker: FC<Props> = ({ selected = 'thisMonth', onChange }) => {
  return (
		<div>
			<ol text-white flex children-px-24px children-pb-12px >
				{
					timeRanges.map(({ key, text }) =>
						<li
							key={key}
							onClick={() => onChange(key)}
							className={key === selected ? styles.selected : ''}
						>
							{text}
						</li>
					)
				}
			</ol>
		</div>
  )
}
