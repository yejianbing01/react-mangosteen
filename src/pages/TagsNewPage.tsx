import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { emojis } from '../lib/emojis'

export const TagsNewPage: FC = () => {
  const [emojiKind, setEmojiKind] = useState(emojis[0].name)

  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<Icon name='back' />} />
			</div>
			<div>
				<div j-form gap-y-8px>
					<div mt-16px>
						<span j-form-label>标签名</span>
						<input type="text" j-form-input />
						<span text-12px text-red m-t-8px>标签名太长</span>
					</div>
					<div>
						<span j-form-label>符号 <span text-24px>🤓</span></span>
						<div b-1 b-solid b="#5c33be" rounded-8px>
							<div flex gap-x-8px p-8px whitespace-nowrap overflow-auto text="#999">
								{
									emojis.map(emoji => (
										<span key={emoji.name} className={emoji.name === emojiKind ? 'text-#5c33be font-bold' : ''}
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
									  ?.chars.map(char => <span key={char}>{char}</span>)
								}
							</div>
						</div>
					</div>
					<div>
						<p text-center m-y-16px>记账时长按标签，即可进行标记</p>
						<button j-btn>确认</button>
					</div>
				</div>
			</div>
		</div>
  )
}
