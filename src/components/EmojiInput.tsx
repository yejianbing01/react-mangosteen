import type { FC } from 'react'
import { useState } from 'react'
import { emojis } from '../lib/emojis'

interface Props {
  value?: string
  onChange?: (value: string) => void
}
export const EmojiInput: FC<Props> = (props) => {
  const { value, onChange } = props
  const [emojiKind, setEmojiKind] = useState(emojis[0].name)

  return (
		<div b-1 b-solid b="[var(--primary-color)]" rounded-8px pb-8px>
			<div flex gap-x-8px p-8px whitespace-nowrap overflow-auto text="#999">
				{
					emojis.map(emoji => (
						<span key={emoji.name} className={emoji.name === emojiKind ? 'text-[var(--primary-color)] font-bold' : ''}
							onClick={() => setEmojiKind(emoji.name)}
						>
							{emoji.name}
						</span>
					))
				}
			</div>
			<div h-400px text-24px text-center leading-34px grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
				justify-center overflow-auto p-b-16px
			>
				{
					emojis.find(emojis => emojis.name === emojiKind)
					  ?.chars.map(char =>
							<span b-1 b-solid b-transparent rounded-4px className={char === value ? '!b-[var(--primary-color)]' : '' }
								key={char} onClick={() => onChange?.(char)}>
								{char}
							</span>
					  )
				}
			</div>
		</div>
  )
}
