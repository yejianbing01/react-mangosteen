import { create } from 'zustand'
import type { FormError } from '../lib/validate'

interface CreateTagData {
  data: Partial<Tag>
  error: FormError<Tag>
  setData: (data: Partial<Tag>) => void
  setError: (error: Partial<FormError<Tag>>) => void
}
export const useCreateTagStore = create<CreateTagData>(set => ({
  data: {
    kind: undefined,
    name: '',
    sign: ''
  },
  error: {
    sign: [],
    name: []
  },
  setData: data => set(state => ({
    ...state,
    data: {
      ...state.data,
      ...data
    }
  })),
  setError: error => set(state => ({
    ...state,
    error: {
      ...error
    }
  }))
}))
