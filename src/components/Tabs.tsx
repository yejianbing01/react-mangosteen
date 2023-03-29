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
		<>
			<ol className={className} text-white flex children-px-24px children-pb-12px >
				{
					tabItems.map(({ key, text }) =>
						<li
							key={key}
							onClick={() => onChange(key)}
							className={key === value ? 'relative after:content-[""] after:absolute after:bottom-0px after:left-0px after:w-100% after:h-3px after:bg-white after:bg-opacity-50' : ''}
						>
							{text}
						</li>
					)
				}
			</ol>
			<div>
				{curElement}
			</div>
		</>
  )
}
