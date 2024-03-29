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
  if (!config.custom) {
    config.custom = { showLoading: false }
  }
  config.custom?.showLoading !== false && Toast.loading()
  return config
}, (error: AxiosError) => {
  let title = error.message
  if (error.status === 404) {
    title = '网络异常，请稍后再试'
  } else {
    title = '未知异常'
  }
  Toast.info(title, 1000)
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  const config = res.config as AjaxInternalAxiosRequestConfig
  config.custom?.showLoading && Toast.hide()
  return res
}, (error: AxiosError<{ errors: { [propName: string]: [] } }>) => {
  let title = error.message
  if (error.response?.status === 401) {
    title = '信息异常，请重新登录'
    replaceHash()
  } else if (error.response?.status === 404) {
    title = '网络异常，请稍后再试'
  } else if (error.response?.status === 422) {
    title = Object.values(error.response.data.errors).flat()[0]
  }
  Toast.info(title, 1000)
  return Promise.reject(error)
})

export const ajax = {
  get: <T>(path: string, config?: AjaxRequestConfig) => {
    return axios.get<T>(path, config)
  },
  post: <T>(path: string, data: JSONValue, config?: AjaxRequestConfig) => {
    return axios.post<T>(path, data, config)
  },
  patch: <T>(path: string, data: JSONValue, config?: AjaxRequestConfig) => {
    return axios.patch<T>(path, data, config)
  },
  delete: (path: string, config?: AjaxRequestConfig) => {
    return axios.delete(path, config)
  }
}
