import type { FC, FormEventHandler } from 'react'
import type { AxiosError } from 'axios'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input/Input'
import { TopNav } from '../components/TopNav'
import { useTitle } from '../hooks/useTitle'
import { ajax } from '../lib/ajax'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'
import { useHashSearchParams } from '../hooks/useHashSearchParams'

interface Props {
  title?: string
}
export const SignIn: FC<Props> = ({ title }) => {
  useTitle(title)
  const { data, setData, error, setError } = useSignInStore()
  const [hashSearchParams] = useHashSearchParams()

  /** 登录 */
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const newError = validate(data, [
      { key: 'email', type: 'required', message: '邮箱不能为空' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱格式不正确' },
      { key: 'code', type: 'required', message: '验证码不能为空' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码为6位' }
    ])
    setError(newError)
    if (hasError(newError)) { return }
    ajax.post<{ jwt: string }>('/api/v1/session', data)
      .then((res) => {
        localStorage.setItem('jwt', res.data.jwt)
        window.location.hash = hashSearchParams.from || '/items'
      })
      .catch((error: AxiosError<{ errors: FormError<typeof data> }>) => setError(error.response?.data.errors ?? {}))
  }

  /** 发送验证码 */
  const sendSmsCode = async () => {
    const error = validate({ email: data.email }, [
      { key: 'email', type: 'required', message: '邮箱不能为空' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱格式不正确' },
    ])
    setError(error)
    if (hasError(error)) { return Promise.reject(new Error(error.email?.[0])) }
    return ajax.post('api/v1/validation_codes', { email: data.email })
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
        <Input type='text' label="邮箱地址" placeholder='请输入邮箱，再点击发送验证码' error={error.email?.[0]}
          value={data.email} onChange={value => setData({ email: value })} />
        <Input type="sms_code" label="验证码" error={error.code?.[0]}
          value={data.code} onChange={value => setData({ code: value })} request={sendSmsCode} />
        <div mt-60px>
          <button type="submit" j-btn>登录</button>
        </div>
      </form>
    </>
  )
}
