import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Toast } from '../components/Toast'

const replaceHash = () => {
  const curHash = window.location.hash
  const newHash = curHash.includes('/sign_in')
    ? '/sign_in'
    : (curHash.includes('from')
        ? curHash
        : curHash ? `/sign_in?from=${curHash}` : '/sign_in'
      )

  const newHref = `${window.location.href.toString().replace(curHash, '')}#${newHash}`
  window.location.replace(newHref)
}
// 山竹API文档 https://mangosteen2.hunger-valley.com/apidoc/
// API 地址 https://mangosteen2.hunger-valley.com 后面加路径，如加 /api/v1/me
axios.defaults.baseURL = isDev ? 'http://121.196.236.94:8080' : 'https://mangosteen2.hunger-valley.com'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'

interface AjaxRequestConfig extends AxiosRequestConfig {
  custom?: {
    showLoading?: boolean
  }
}
interface AjaxInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  custom?: {
    showLoading?: boolean
  }
}
axios.interceptors.request.use((config: AjaxInternalAxiosRequestConfig) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  config.custom?.showLoading && Toast.loading()
  return config
}, (error: AxiosError) => {
  Toast.info(error.message, 1000)
  return Promise.reject(error)
})

axios.interceptors.response.use((value) => {
  Toast.hide()
  return value
}, (error: AxiosError<{ errors: {} }>) => {
  let title = error.message
  if (error.response?.status === 401) {
    title = '信息异常，请重新登录'
    replaceHash()
  }
  Toast.info(title, 1000)
  return Promise.reject(error)
})

export const ajax = {
  get: <T>(path: string, config?: AjaxRequestConfig) => {
    return axios.get<T>(path, config)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {},
}
