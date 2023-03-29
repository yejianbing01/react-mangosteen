import type { ReactNode } from 'react'

interface Props<T> {
  tabItems: { key: T; text: string; element?: ReactNode }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, value, onChange, className } = props
  const curElement = tabItems.find(tabItem => tabItem.key === value)?.element
  return (
		<div flex flex-col h="100%">
			<ol className={className}
				text-white flex children-px-24px children-pb-12px
				grow-0 shrink-0
			>
				{tabItems.map(({ key, text }) =>
						<li
							key={key}
							onClick={() => onChange(key)}
							className={key === value ? 'relative after:content-[""] after:absolute after:bottom-0px after:left-0px after:w-100% after:h-3px after:bg-white after:bg-opacity-50' : ''}
						>
							{text}
						</li>
				)}
			</ol>
			<div overflow-scroll grow-1 shrink-1>
				{curElement}
			</div>
		</div>
  )
}
