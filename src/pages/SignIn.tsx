import type { FC, FormEventHandler } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useTitle } from '../hooks/useTitle'
import { useSignInStore } from '../stores/useSignIdStore'

interface Props {
  title?: string
}
export const SignIn: FC<Props> = ({ title }) => {
  useTitle(title)
  const { data, setData } = useSignInStore()

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <>
  		<div j-bg>
        <TopNav title='登录' icon={<Icon name='back' className='w-24px h-24px' />} />
  		</div>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className="w-64px h-68px" />
        <h1 text-32px text="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <div>
          <span j-form-label>邮箱地址</span>
          <input value={data.email} type="text" placeholder='请输入邮箱，再点击发送验证码'j-form-input
            onChange={e => setData({ email: e.target.value })}
          />
        </div>
        <div>
          <span j-form-label>验证码</span>
          <div flex gap-x-16px>
            <input value={data.code} type="text" placeholder='六位数字' w-128px j-form-input
              onChange={e => setData({ code: e.target.value })}
            />
            <button j-btn>发送验证码</button>
          </div>
        </div>
        <div mt-60px>
          <button type="submit" j-btn>登录</button>
        </div>
      </form>
    </>
  )
}
