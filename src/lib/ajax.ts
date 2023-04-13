import type { AxiosError } from 'axios'
import axios from 'axios'
import { Toast } from '../components/Toast'

axios.defaults.baseURL = isDev ? 'https://121.196.236.94:8080/' : 'https://121.196.236.94:8080/'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  Toast.loading()
  return config
}, (error: AxiosError) => {
  Toast.info(error.message, 1000)
  return Promise.reject(error)
})

axios.interceptors.response.use((value) => {
  Toast.hide()
  return value
}, (error: AxiosError) => {
  Toast.info(error.message, 1000)
  return Promise.reject(error)
})

export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {},
}
