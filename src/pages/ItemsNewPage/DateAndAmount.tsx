import type { FC } from 'react'
import { Icon } from '../../components/Icon'

interface Props {
  date?: string
  className?: string
  onDateClick?: () => void
}
export const DateAndAmount: FC<Props> = ({ date, className, onDateClick }) => {
  return (
		<div className={className} >
			<div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
				<Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" onClick={onDateClick} />
				<span grow-0 shrink-0 text-12px color="#999" onClick={onDateClick}>{date}</span>
				<code grow-1 shrink-1 text-right color="#53A867">123456789.01</code>
			</div>
			<div py-1px grid grid-rows="[repeat(4,56px)]" grid-cols-4 bg="#ddd" gap-1px children-bg-white >
				<button row-start-1 col-start-1 row-end-2 col-end-2 >1</button>
				<button row-start-1 col-start-2 row-end-2 col-end-3 >2</button>
				<button row-start-1 col-start-3 row-end-2 col-end-4 >3</button>
				<button row-start-2 col-start-1 row-end-3 col-end-2 >4</button>
				<button row-start-2 col-start-2 row-end-3 col-end-3 >5</button>
				<button row-start-2 col-start-3 row-end-3 col-end-4 >6</button>
				<button row-start-3 col-start-1 row-end-4 col-end-2 >7</button>
				<button row-start-3 col-start-2 row-end-4 col-end-3 >8</button>
				<button row-start-3 col-start-3 row-end-4 col-end-4 >9</button>
				<button row-start-4 col-start-1 row-end-5 col-end-3 >0</button>
				<button row-start-4 col-start-3 row-end-5 col-end-4 >.</button>
				<button row-start-1 col-start-4 row-end-3 col-end-5 >清空</button>
				<button row-start-3 col-start-4 row-end-5 col-end-5 >提交</button>
			</div>
		</div>
  )
}
