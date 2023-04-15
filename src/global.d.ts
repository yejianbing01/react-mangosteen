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

type Kind = 'expenses' | 'income'

interface Item {
  id: string
  user_id: string
  amount: number
  note?: string
  tag_ids: string[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: Kind
  deleted_at?: string
}

interface Tag {
  id: string
  kind: Kind
  user_id: string
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}