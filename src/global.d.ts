var isDev: boolean
type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]
interface Resource<T> {
  resource: T
}
interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}
interface Item {
  id: string
  user_id: string
  amount: number
  note?: string
  tag_ids: number[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}

interface Tag {
  id: string
  kind: Item['kind']
  user_id: string
  name: string
  sign: string
  deleted_at: string
  created_at: string
  updated_at: string
}