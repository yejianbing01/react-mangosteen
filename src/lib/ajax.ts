import axios from 'axios'

axios.defaults.baseURL = isDev ? 'http://121.196.236.94:8080/' : 'https://121.196.236.94:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
axios.defaults.timeout = 10000

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
