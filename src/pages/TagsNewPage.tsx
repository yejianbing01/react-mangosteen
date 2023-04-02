import type { FC } from 'react'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'

export const TagsNewPage: FC = () => {
  const [tagName, setTagName] = useState('')
  const [emoji, setEmoji] = useState('😀')

  const emojiLabel = (
		<div className="flex items-center">
			符号
			<span className='text-24px h-34px ml-4px'>{emoji}</span>
		</div>
  )

  return (
		<div>
			<div j-bg>
				<TopNav title='新建标签' icon={<Icon name='back' />} />
			</div>
			<div>
				<div j-form py-16px>
					<Input label='标签名' placeholder='请输入标签名' value={tagName} onChange={value => setTagName(value)} />
					<Input label={emojiLabel} type="emoji" value={emoji} onChange={value => setEmoji(value)} />
					<div>
						<p text-center m-y-16px>记账时长按标签，即可进行编辑</p>
						<button j-btn>确认</button>
					</div>
				</div>
			</div>
		</div>
  )
}
