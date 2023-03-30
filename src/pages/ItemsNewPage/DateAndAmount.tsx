import type { FC } from 'react'
import { Icon } from '../../components/Icon'

interface Props {
  className?: string
}
export const DateAndAmount: FC<Props> = ({ className }) => {
  return (
		<div className={className} >
			<div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
				<Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
				<span grow-0 shrink-0 text-12px color="#999">2001-02-03</span>
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

// .div1 { grid - area: 1 / 1 / 2 / 2; }
// .div2 { grid - area: 1 / 2 / 2 / 3; }
// .div3 { grid - area: 1 / 3 / 2 / 4; }
// .div4 { grid - area: 2 / 1 / 3 / 2; }
// .div5 { grid - area: 2 / 2 / 3 / 3; }
// .div6 { grid - area: 2 / 3 / 3 / 4; }
// .div7 { grid - area: 3 / 1 / 4 / 2; }
// .div8 { grid - area: 3 / 2 / 4 / 3; }
// .div9 { grid - area: 3 / 3 / 4 / 4; }
// .div10 { grid - area: 4 / 1 / 5 / 3; }
// .div11 { grid - area: 4 / 3 / 5 / 4; }
// .div12 { grid - area: 1 / 4 / 3 / 5; }
// .div13 { grid - area: 3 / 4 / 5 / 5; }
