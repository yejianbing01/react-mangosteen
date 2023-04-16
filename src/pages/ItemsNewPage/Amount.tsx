import type { FC, ReactNode } from 'react'
import { useState } from 'react'

interface Props {
  value: number
  onChange: (value: number) => void
  onSubmit: () => void
  className?: string
  itemDate: ReactNode
}
export const Amount: FC<Props> = (props) => {
  const { value, onChange, onSubmit, className, itemDate } = props
  const [output, setOutput] = useState(value.toString())

  const append = (char: string) => {
    let _output = output
    switch (char) {
      case '.':
        if (!_output.includes(char)) { _output += char }
        break
      case '0':
        if (output !== char) { _output += char }
        break
      default:
        if (_output === '0') {
          _output = char
        } else {
          _output += char
        }
        break
    }
    if (_output.includes('.') && (_output.length - _output.indexOf('.') > 3)) { return }
    if (_output.length > 16) { return }
    setOutput(_output)
    onChange(parseFloat(_output) * 100)
  }

  const clear = () => {
    setOutput('0')
    onChange(0)
  }

  return (
		<div className={className} >
			<div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
        {itemDate}
				<code grow-1 shrink-1 text-right color="#53A867">{output}</code>
			</div>
			<div py-1px grid grid-rows="[repeat(4,56px)]" grid-cols-4 bg="#ddd" gap-1px children-bg-white >
				<button row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')} >1</button>
				<button row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')} >2</button>
				<button row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')} >3</button>
				<button row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')} >4</button>
				<button row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')} >5</button>
				<button row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')} >6</button>
				<button row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')} >7</button>
				<button row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')} >8</button>
				<button row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')} >9</button>
				<button row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')} >0</button>
				<button row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')} >.</button>
				<button row-start-1 col-start-4 row-end-3 col-end-5 onClick={clear}>清空</button>
				<button onClick={onSubmit} row-start-3 col-start-4 row-end-5 col-end-5 >提交</button>
			</div>
		</div>
  )
}
