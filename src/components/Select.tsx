
interface Props<T> {
  name: string
  items: { value: T; text: string }[]
  value: T
  onChange: (value: T) => void
}
export const Select = <T extends string | number>(props: Props<T>) => {
  const { name, items, value, onChange } = props
  return (
		<select w-full h-full name={name} value={value} onChange={e => onChange(e.target.value as T)} >
			{items.map(item => <option key={item.value} value={item.value}>{ item.text }</option>)}
		</select>
  )
}
