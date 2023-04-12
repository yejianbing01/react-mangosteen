import axios from 'axios'

axios.defaults.baseURL = isDev ? 'http://121.196.236.94:8080/' : 'https://121.196.236.94:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
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
